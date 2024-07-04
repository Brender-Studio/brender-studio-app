// import { z } from "zod";
// import { createRenderJson } from "./helpers/createRenderJson";
// import { formRenderSchema } from "@/schemas/formRenderSchema";
// import { compressFolder } from "./helpers/compressFolder";
// import { uploadObject } from "@/cli-functions/s3-data/uploadObject";
// import { s3toEfs } from "@/cli-functions/batch/jobs/s3toEfs";
// import { renderJob } from "@/cli-functions/batch/jobs/renderJob";
// import { efsTos3 } from "@/cli-functions/batch/jobs/efsTos3";
// import { getLastSegmentOfFilePath, getLastSegmentOfFolderPath, getSubPathFromFolderPath } from "./helpers/folderPathUtils";
// import { createJob3Command } from "./helpers/createJob3Command";
// import { PROGRESS_STEPS_RENDER } from "@/constants/progress/progressConstants";
// import { deleteCompressedFolder } from "./helpers/deleteCompressedFolder";
// import { customPythonJob } from "@/cli-functions/batch/jobs/customPythonJob";
// import { uploadFolder } from "@/cli-functions/s3-data/uploadFolder";

// const JOB_ACTION_TYPE = {
//     COPY_EFS: 'copy_efs',
//     RENDER: 'render',
//     UPLOAD_RENDER_OUTPUT: 'upload_render_output',
//     REMOVE_EFS: 'remove_efs',
//     CUSTOM_PYTHON: 'custom_render_python'
// }

// interface SubmitJobSequenceProps {
//     values: z.infer<typeof formRenderSchema>;
//     bucketName: string;
//     currentProfile: string;
//     currentAwsRegion: string;
//     progressCallback: (step: string) => void;
// }

// export async function submitJobSequence({ values, bucketName, currentProfile, currentAwsRegion, progressCallback }: SubmitJobSequenceProps) {

//     console.log('values', values)
//     console.log('bucketName', bucketName)
//     console.log('currentProfile', currentProfile)

//     const bucketKey = values.project_name;

//     // 1. Crear objeto json según backend (por ahora pensado para auto y cpu)
//     const renderJsonCommand = await createRenderJson(values);

//     progressCallback(PROGRESS_STEPS_RENDER.PREPARING_FILES);
//     // 2. Comprimir folder según ruta del os a tar.gz

//     if (values.is_folder) {
//         // Comprimir folder function
//         if (!values.folder_path) throw new Error('No folder path provided');
//         const outputPath = await compressFolder(values.folder_path);

//         if (!outputPath) throw new Error('No output path provided');

//         // 3. Subir carpeta comprimida al folder del stack cf (debemos saber primero el bucket name), generamos un folder nuevo según el nombre del proyecto del form.
//         const uploadBlendCompressedFolder = await uploadObject({ bucketName, objectPath: bucketKey, filePath: outputPath, currentProfile });
//         progressCallback(PROGRESS_STEPS_RENDER.UPLOADING_FILES);
//         console.log('uploadBlendCompressedFolder', uploadBlendCompressedFolder);
//         // here we should delete the compressed folder
//         await deleteCompressedFolder(outputPath);
//     } else {
//         // TODO: Implement file upload to s3, without compressing it
//         if (!values.file_path) throw new Error('No file path provided');
//         const uploadBlendFile = await uploadObject({ bucketName, objectPath: bucketKey, filePath: values.file_path, currentProfile });
//         progressCallback(PROGRESS_STEPS_RENDER.UPLOADING_FILES);
//         console.log('uploadBlendFile', uploadBlendFile);
//     }

//     if (values.type === 'custom_render_python' && values.is_folder_python) {
//         // TODO: UPLOAD NO COMPRESSED FOLDER TO S3
//         if (!values.folder_path_python) throw new Error('No folder path provided');
//         const uploadPythonFolder = await uploadFolder({ bucketName, objectKey: bucketKey, folderPath: values.folder_path_python, currentProfile });
//         progressCallback(PROGRESS_STEPS_RENDER.UPLOADING_FILES);
//         console.log('uploadPythonFolder', uploadPythonFolder);

//     } else if (values.type === 'custom_render_python' && values.python_script_path){
//         if (!values.python_script_path) throw new Error('No file path provided');
//         const uploadPythonFile = await uploadObject({ bucketName, objectPath: bucketKey, filePath: values.python_script_path, currentProfile });
//         progressCallback(PROGRESS_STEPS_RENDER.UPLOADING_FILES);
//         console.log('uploadPythonFile', uploadPythonFile);
//     }

//     // 4. Llamar al 1r job de aws batch con aws cli desde una función tauri, debe ejecutar el primer job: copiar el project de s3 a efs.
//     const jobQueue = values.job_settings?.job_queue;
//     const jobDefinition = values.job_settings?.job_definition;
//     // const instanceType = values.job_settings?.instance_type;
//     const jobAttempts = values.job_settings?.job_attempts;
//     // const priority = values.job_settings?.job_priority;
//     const jobTimeout = values.job_settings?.timeout;
//     const memory = values.job_settings?.memory;
//     const vCpus = values.job_settings?.vcpus;
//     const numGPUs = values.job_settings?.number_gpus;



//     console.log('jobQueue', jobQueue);
//     console.log('jobDefinition', jobDefinition);

//     if (!jobQueue || !jobDefinition || !jobAttempts || !jobTimeout || !memory || !vCpus || !numGPUs) throw new Error('Job settings not provided');


//     progressCallback(PROGRESS_STEPS_RENDER.SUBMITING_JOB_1);
//     const job1 = await s3toEfs({ bucketName, bucketKey, currentProfile, awsRegion: currentAwsRegion, jobQueue, jobDefinition, jobActionType: JOB_ACTION_TYPE.COPY_EFS, vcpus: '1', memory: '2048', jobTimeout: jobTimeout, numGPUs: 0 });

//     console.log('job1', job1)

//     const job1Id = job1.jobId;

//     console.log('job1Id', job1Id);

//     // 5. Llamar al job 2: Este será el job de renderizado, debemos enviar command override con el json con los datos necesarios para el render de Blender (resolution,samples,etc). Job depends on job 1.

//     // crear una funcion que calcule el ef_blender_file_path y el efs_blender_output_folder_path segun folder_path y file_path

//     const folderPath = values.folder_path || '';
//     const filePath = values.file_path;

//     if (!filePath) throw new Error('Folder path or file path not provided');

//     let fullFilePath: string;

//     if (values.is_folder) {
//         // Obtener el último segmento de la ruta de la carpeta
//         const folderName = getLastSegmentOfFolderPath(folderPath);

//         // Obtener la subruta del archivo en relación con el nombre de la carpeta
//         const subPath = getSubPathFromFolderPath(filePath, folderName);

//         console.log('folderName', folderName);
//         console.log('subPath', subPath);
//         fullFilePath = `${bucketKey}/${subPath}`;
//         console.log('fullFilePath', fullFilePath);
//     } else {
//         const lastSegment = getLastSegmentOfFilePath(filePath);
//         console.log('lastSegment', lastSegment)
//         fullFilePath = `${bucketKey}/${lastSegment}`;
//         console.log('fullFilePath', fullFilePath);
//     }

//     // SAME LOGIC BUT FOR PYTHON SCRIPT
//     const folderPathPython = values.folder_path_python || '';
//     const filePathPython = values.python_script_path || '';

//     // if (!filePathPython) throw new Error('Folder path or file path not provided');

//     let fullFilePathPython: string;

//     if (values.type === 'custom_render_python' && values.is_folder_python) {
//         // Obtener el último segmento de la ruta de la carpeta
//         const folderName = getLastSegmentOfFolderPath(folderPathPython);

//         // Obtener la subruta del archivo en relación con el nombre de la carpeta
//         const subPath = getSubPathFromFolderPath(filePathPython, folderName);

//         console.log('folderName', folderName);
//         console.log('subPath', subPath);
//         fullFilePathPython = `${bucketKey}/${subPath}`;
//         console.log('fullFilePathPython', fullFilePathPython);
//     } else  {
//         const lastSegment = getLastSegmentOfFilePath(filePathPython);
//         console.log('lastSegment', lastSegment)
//         fullFilePathPython = `${bucketKey}/${lastSegment}`;
//         console.log('fullFilePathPython', fullFilePathPython);
//     }

//     const efsBlenderFilePathPython = `/mnt/efs/projects/${fullFilePathPython}`;
//     console.log('efsBlenderFilePathPython', efsBlenderFilePathPython);

//     const efsBlenderFilePath = `/mnt/efs/projects/${fullFilePath}`;
//     const efsBlenderOutputFolderPath = `/mnt/efs/projects/${bucketKey}/output`;

//     console.log('efsBlenderFilePath', efsBlenderFilePath);
//     console.log('efsBlenderOutputFolderPath', efsBlenderOutputFolderPath);


//     // stringified json
//     const jsonSTR = JSON.stringify(renderJsonCommand);

//     console.log('jsonSTR', jsonSTR)

//     const escapedJsonSTR = jsonSTR.replace(/\"/g, '\\"');


//     // solo calcular array size si type es animation
//     let jobArraySize = 0;

//     const parsedArraySize = parseInt(values.job_settings?.array_size || '0');

//     if (values.type === 'animation') {
//         jobArraySize = parsedArraySize;
//     } else if (values.type === 'custom_render_python') {
//         jobArraySize = parsedArraySize
//     } else {
//         jobArraySize = 0;
//     }


//     console.log('jobArraySize', jobArraySize);
//     let job2Id = '';

//     progressCallback(PROGRESS_STEPS_RENDER.SUBMITING_JOB_2);
//     // job 2 can be custom render python or animation/frame render
//     if (values.type === 'custom_render_python') {
//         //todo: implement custom render python job
//         const useEevee = values.python_env_vars?.use_eevee;
//         const useGpus = values.python_env_vars?.use_gpus;
//         const bucketName = values.python_env_vars?.bucket_name;
//         const bucketKey = values.python_env_vars?.bucket_key;
//         const customScriptPath = efsBlenderFilePathPython;
//         const job2 = await customPythonJob({
//             currentProfile,
//             awsRegion: currentAwsRegion,
//             jobQueue,
//             jobDefinition,
//             jobActionType: JOB_ACTION_TYPE.CUSTOM_PYTHON,
//             efsBlenderFilePath,
//             efsBlenderOutputFolderPath,
//             jobId: job1Id,
//             vcpus: vCpus,
//             memory: memory,
//             jobTimeout: jobTimeout,
//             numGPUs: parseInt(numGPUs),
//             jobArraySize,
//             attempts: jobAttempts,
//             useEevee: useEevee || 'False',
//             useGpus: useGpus || 'False',
//             bucketName: bucketName || '',
//             bucketKey: bucketKey || values.project_name,
//             customScriptPath: customScriptPath || ''
//         });
//         console.log('job2', job2);
//         job2Id = job2.jobId;
//     } else {
//         const job2 = await renderJob({
//             currentProfile,
//             awsRegion: currentAwsRegion,
//             jobQueue,
//             jobDefinition,
//             jobActionType: JOB_ACTION_TYPE.RENDER,
//             efsBlenderFilePath,
//             efsBlenderOutputFolderPath,
//             renderJsonCommand: escapedJsonSTR,
//             jobId: job1Id,
//             vcpus: vCpus,
//             memory: memory,
//             jobTimeout: jobTimeout,
//             numGPUs: parseInt(numGPUs),
//             jobArraySize,
//             attempts: jobAttempts
//         });
//         console.log('job2', job2);
//         job2Id = job2.jobId;
//         console.log('job2Id', job2Id);
//     }


//     // 6. Llamar job 3: Subir los resultados de la carpeta /output del proyecto a s3 en la misma carpeta de proyecto. Job depends on job 2.
//     // const testEmail = 'rejdev24@gmail.com'
//     // crear json command para job 3:
//     const job3Command = await createJob3Command(
//         values,
//         currentAwsRegion,
//         job2Id,
//         values.type === 'animation' ? 'Animation' : 'Still',
//         values.ses?.ses_email!,
//         values.ses?.ses_email!
//     );

//     // stringified json
//     const jsonSTR3 = JSON.stringify(job3Command);

//     console.log('jsonSTR3', jsonSTR3)

//     const escapedJsonSTR3 = jsonSTR3.replace(/\"/g, '\\"');

//     console.log('escapedJsonSTR3', escapedJsonSTR3);

//     progressCallback(PROGRESS_STEPS_RENDER.SUBMITING_JOB_3);

//     const job3 = await efsTos3({ bucketName, bucketKey, currentProfile, currentAwsRegion, jobQueue, jobDefinition, jobActionType: JOB_ACTION_TYPE.UPLOAD_RENDER_OUTPUT, jobId: job2Id, vcpus: '1', memory: '2048', jobTimeout: jobTimeout, numGPUs: 0, job3Command: escapedJsonSTR3 });

//     console.log('job3', job3);



//     return values;
// }