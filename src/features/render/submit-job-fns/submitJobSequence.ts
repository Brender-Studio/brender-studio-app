import { z } from "zod";
import { createRenderJson } from "./helpers/createRenderJson";
import { formRenderSchema } from "@/schemas/formRenderSchema";
import { getLastSegmentOfFilePath, getLastSegmentOfFolderPath, getSubPathFromFolderPath } from "./helpers/folderPathUtils";
import { createJob3Command } from "./helpers/createJob3Command";
import { PROGRESS_STEPS_RENDER } from "@/constants/progress/progressConstants";
import { compressFolder } from "./helpers/compressFolder";
import { uploadObject } from "@/cli-functions/s3-data/uploadObject";
import { deleteCompressedFolder } from "./helpers/deleteCompressedFolder";
import { uploadFolder } from "@/cli-functions/s3-data/uploadFolder";
import { s3toEfs } from "@/cli-functions/batch/jobs/s3toEfs";
import { customPythonJob } from "@/cli-functions/batch/jobs/customPythonJob";
import { renderJob } from "@/cli-functions/batch/jobs/renderJob";
import { efsTos3 } from "@/cli-functions/batch/jobs/efsTos3";
import { efsMainScriptPath } from "@/lib/utils/efsPaths";
import { getFileSize, getFolderSize } from "@/lib/utils/sizeLocalPath";
import { setS3cliConfig } from "@/cli-functions/cli-utils/cli-s3-upload-config/setS3cliConfig";

const JOB_ACTION_TYPE = {
    COPY_EFS: 'copy_efs',
    RENDER: 'render',
    UPLOAD_RENDER_OUTPUT: 'upload_render_output',
    REMOVE_EFS: 'remove_efs',
    CUSTOM_PYTHON: 'custom_render_python'
}

interface SubmitJobSequenceProps {
    values: z.infer<typeof formRenderSchema>;
    bucketName: string;
    currentProfile: string;
    currentAwsRegion: string;
    progressCallback: (step: string) => void;
}

interface JobSettings {
    jobQueue: string;
    jobDefinition: string;
    jobAttempts: string;
    jobTimeout: string;
    memory: string;
    vCpus: string;
    numGPUs: number;
    arraySize: number;
}

interface CustomEnvVar {
    name: string;
    value: string;
}


export async function submitJobSequence({ values, bucketName, currentProfile, currentAwsRegion, progressCallback }: SubmitJobSequenceProps) {

    console.log('values', values);
    console.log('bucketName', bucketName);
    console.log('currentProfile', currentProfile);

    const bucketKey = values.project_name;
    const renderJsonCommand = await createRenderJson(values);
    progressCallback(PROGRESS_STEPS_RENDER.PREPARING_FILES);

    const blenderFilePath = await handleBlenderFileUpload(values, bucketKey, bucketName, currentAwsRegion, currentProfile, progressCallback);
    const pythonFilePath = await handlePythonFileUpload(values, bucketKey, bucketName, currentProfile, progressCallback);

    console.log('blenderFilePath', blenderFilePath);
    console.log('pythonFilePath', pythonFilePath);

    const jobSettings = getJobSettings(values);
    validateJobSettings(jobSettings);

    progressCallback(PROGRESS_STEPS_RENDER.SUBMITING_JOB_1);
    const job1 = await submitS3ToEfsJob(bucketName, bucketKey, currentProfile, currentAwsRegion, jobSettings);
    const job1Id = job1.jobId;

    const { efsBlenderFilePath, efsBlenderOutputFolderPath, efsPythonFilePath } = constructEfsPaths(values, bucketKey, blenderFilePath!, pythonFilePath!);

    console.log('efsBlenderFilePath', efsBlenderFilePath);
    console.log('efsBlenderOutputFolderPath', efsBlenderOutputFolderPath);
    console.log('efsPythonFilePath', efsPythonFilePath);
    progressCallback(PROGRESS_STEPS_RENDER.SUBMITING_JOB_2);
    const job2Id = await submitRenderJob(values, bucketKey, job1Id, currentProfile, currentAwsRegion, jobSettings, efsBlenderFilePath, efsBlenderOutputFolderPath, efsPythonFilePath!, renderJsonCommand);

    progressCallback(PROGRESS_STEPS_RENDER.SUBMITING_JOB_3);
    const job3Command = await createJob3Command(values, currentAwsRegion, job2Id.jobId, getJobType(values), values.ses?.ses_email!, values.ses?.ses_email!);
    const job3 = await submitEfsToS3Job(bucketName, bucketKey, currentProfile, currentAwsRegion, jobSettings, job2Id.jobId, job3Command);

    console.log('job3', job3);
    return values;
}


async function handleBlenderFileUpload(values: z.infer<typeof formRenderSchema>, bucketKey: string, bucketName: string, currentAwsRegion: string, currentProfile: string, progressCallback: (step: string) => void) {
    let size: number;
    let path: string;

    if (values.is_folder) {
        if (!values.folder_path) throw new Error('No folder path provided');
        path = values.folder_path;
        size = await getFolderSize(path);
    } else {
        if (!values.file_path) throw new Error('No file path provided');
        path = values.file_path;
        size = await getFileSize(path);
    }

    console.log('size:', size);

    // Configure S3 CLI based on file size
    await setS3cliConfig(currentAwsRegion, currentProfile, size);

    if (values.is_folder) {
        const outputPath = await compressFolder(values.folder_path!);
        if (!outputPath) throw new Error('No output path provided');

        await uploadObject({ bucketName, objectPath: bucketKey, filePath: outputPath, currentProfile });
        progressCallback(PROGRESS_STEPS_RENDER.UPLOADING_FILES);
        await deleteCompressedFolder(outputPath);
        return values.file_path;
    } else {
        if (values.file_path) {
            await uploadObject({ bucketName, objectPath: bucketKey, filePath: values.file_path, currentProfile });
        }
        progressCallback(PROGRESS_STEPS_RENDER.UPLOADING_FILES);
        return values.file_path;
    }
}

async function handlePythonFileUpload(values: z.infer<typeof formRenderSchema>, bucketKey: string, bucketName: string, currentProfile: string, progressCallback: (step: string) => void) {
    if (values.type === JOB_ACTION_TYPE.CUSTOM_PYTHON) {
        if (values.is_folder_python && values.folder_path_python) {
            await uploadFolder({ bucketName, objectKey: bucketKey, folderPath: values.folder_path_python, currentProfile });
            progressCallback(PROGRESS_STEPS_RENDER.UPLOADING_FILES);
            return values.python_script_path;
            // return values.folder_path_python;
        } else if (values.python_script_path) {
            await uploadObject({ bucketName, objectPath: bucketKey, filePath: values.python_script_path, currentProfile });
            progressCallback(PROGRESS_STEPS_RENDER.UPLOADING_FILES);
            return values.python_script_path;
        }
    }
    return null;
}

function getJobSettings(values: z.infer<typeof formRenderSchema>) {
    return {
        jobQueue: values.job_settings?.job_queue ?? '',
        jobDefinition: values.job_settings?.job_definition ?? '',
        jobAttempts: values.job_settings?.job_attempts ?? '0',
        jobTimeout: values.job_settings?.timeout ?? '0',
        memory: values.job_settings?.memory ?? '',
        vCpus: values.job_settings?.vcpus ?? '',
        numGPUs: parseInt(values.job_settings?.number_gpus ?? '0'),
        arraySize: parseInt(values.job_settings?.array_size ?? '0')
    };
}

function validateJobSettings(jobSettings: JobSettings) {
    console.log('jobSettings:', jobSettings)
    const { jobQueue, jobDefinition, jobAttempts, jobTimeout, memory, vCpus } = jobSettings;
    if (!jobQueue || !jobDefinition || !jobAttempts || !jobTimeout || !memory || !vCpus) {
        throw new Error('Job settings not provided');
    }
}

async function submitS3ToEfsJob(bucketName: string, bucketKey: string, currentProfile: string, awsRegion: string, jobSettings: JobSettings) {
    return s3toEfs({
        bucketName, bucketKey, currentProfile, awsRegion,
        jobQueue: jobSettings.jobQueue,
        jobDefinition: jobSettings.jobDefinition,
        jobActionType: JOB_ACTION_TYPE.COPY_EFS,
        vcpus: '1',
        memory: '2048',
        jobTimeout: jobSettings.jobTimeout,
        numGPUs: 0
    });
}

function constructEfsPaths(values: z.infer<typeof formRenderSchema>, bucketKey: string, blenderFilePath: string, pythonFilePath: string) {
    const efsBlenderFilePath = constructEfsPath(values, bucketKey, blenderFilePath, values.is_folder!);
    const efsBlenderOutputFolderPath = `/mnt/efs/projects/${bucketKey}/output`;
    const efsPythonFilePath = pythonFilePath ? efsMainScriptPath(values) : null;
    return { efsBlenderFilePath, efsBlenderOutputFolderPath, efsPythonFilePath };
}

// TODO: REVIEW THIS FUNCTION _values
function constructEfsPath(_values: z.infer<typeof formRenderSchema>, bucketKey: string, filePath: string, isFolder: boolean) {
    if (isFolder) {
        console.log('filepath:', filePath);
        const folderName = getLastSegmentOfFolderPath(_values.folder_path ?? '');
        console.log('folderName:', folderName);
        // const subPath = getSubPathFromFolderPath(filePath, folderName);
        const subPath = getSubPathFromFolderPath(_values.folder_path ?? '', folderName, filePath);
        console.log('subPath:', subPath);
        console.log('all path:', `/mnt/efs/projects/${bucketKey}/${subPath}`);
        return `/mnt/efs/projects/${bucketKey}/${subPath}`;
    } else {
        const lastSegment = getLastSegmentOfFilePath(filePath);
        return `/mnt/efs/projects/${bucketKey}/${lastSegment}`;
    }
}

async function submitRenderJob(values: z.infer<typeof formRenderSchema>, bucketKey: string, job1Id: string, currentProfile: string, awsRegion: string, jobSettings: JobSettings, efsBlenderFilePath: string, efsBlenderOutputFolderPath: string, efsPythonFilePath: string, renderJsonCommand: any) {
    const jsonSTR = JSON.stringify(renderJsonCommand).replace(/\"/g, '\\"');
    if (values.type === JOB_ACTION_TYPE.CUSTOM_PYTHON) {
        return submitCustomPythonJob(values, job1Id, currentProfile, awsRegion, jobSettings, efsPythonFilePath, efsBlenderOutputFolderPath, efsBlenderFilePath);
    } else {
        return submitBlenderRenderJob(values, bucketKey, job1Id, currentProfile, awsRegion, jobSettings, efsBlenderFilePath, efsBlenderOutputFolderPath, jsonSTR);
    }
}

async function submitCustomPythonJob(values: z.infer<typeof formRenderSchema>, job1Id: string, currentProfile: string, awsRegion: string, jobSettings: JobSettings, efsPythonFilePath: string, efsBlenderOutputFolderPath: string, efsBlenderFilePath: string) {
    const { use_eevee, use_gpus, bucket_name, bucket_key } = values.python_env_vars || {};
    // custom env vars
    // Valida si values.custom_env_vars está definido y no está vacío
    const customEnvVars = values.custom_env_vars && values.custom_env_vars.length > 0
    ? values.custom_env_vars
        .filter((envVar): envVar is CustomEnvVar => envVar.name !== undefined && envVar.value !== undefined)
        .map((envVar: CustomEnvVar) => ({ name: envVar.name, value: envVar.value }))
    : [];

    console.log('customEnvVars', customEnvVars);

    return customPythonJob({
        currentProfile, awsRegion,
        jobQueue: jobSettings.jobQueue,
        jobDefinition: jobSettings.jobDefinition,
        jobActionType: JOB_ACTION_TYPE.CUSTOM_PYTHON,
        efsBlenderFilePath: efsBlenderFilePath,
        efsBlenderOutputFolderPath,
        jobId: job1Id,
        vcpus: jobSettings.vCpus,
        memory: jobSettings.memory,
        jobTimeout: jobSettings.jobTimeout,
        numGPUs: jobSettings.numGPUs,
        jobArraySize: jobSettings.arraySize,
        attempts: jobSettings.jobAttempts,
        useEevee: use_eevee || 'False',
        useGpus: use_gpus || 'False',
        bucketName: bucket_name || '',
        bucketKey: bucket_key || values.project_name,
        customScriptPath: efsPythonFilePath || '',
        customEnvVars
    });
}

async function submitBlenderRenderJob(_values: z.infer<typeof formRenderSchema>, bucketKey: string, job1Id: string, currentProfile: string, awsRegion: string, jobSettings: JobSettings, efsBlenderFilePath: string, efsBlenderOutputFolderPath: string, jsonSTR: string) {
    return renderJob({
        bucketKey,
        currentProfile, awsRegion,
        jobQueue: jobSettings.jobQueue,
        jobDefinition: jobSettings.jobDefinition,
        jobActionType: JOB_ACTION_TYPE.RENDER,
        efsBlenderFilePath,
        efsBlenderOutputFolderPath,
        renderJsonCommand: jsonSTR,
        jobId: job1Id,
        vcpus: jobSettings.vCpus,
        memory: jobSettings.memory,
        jobTimeout: jobSettings.jobTimeout,
        numGPUs: jobSettings.numGPUs,
        jobArraySize: jobSettings.arraySize,
        attempts: jobSettings.jobAttempts
    });
}

async function submitEfsToS3Job(bucketName: string, bucketKey: string, currentProfile: string, awsRegion: string, jobSettings: JobSettings, job2Id: string, job3Command: any) {
    const escapedJsonSTR3 = JSON.stringify(job3Command).replace(/\"/g, '\\"');
    return efsTos3({
        bucketName,
        bucketKey,
        currentProfile,
        currentAwsRegion: awsRegion,
        jobQueue: jobSettings.jobQueue,
        jobDefinition: jobSettings.jobDefinition,
        jobActionType: JOB_ACTION_TYPE.UPLOAD_RENDER_OUTPUT,
        jobId: job2Id,
        vcpus: '1',
        memory: '16000',
        jobTimeout: jobSettings.jobTimeout,
        numGPUs: 0,
        job3Command: escapedJsonSTR3
    });
}

// "custom_render_python", "frame", "animation"

function getJobType(values: z.infer<typeof formRenderSchema>) {
    // return values.type === 'animation' ? 'Animation' : 'Still';
    switch (values.type) {
        case 'custom_render_python':
            return 'Custom Python';
        case 'frame':
            return 'Still';
        case 'animation':
            return 'Animation';
        default:
            return 'Still';
    }
}
