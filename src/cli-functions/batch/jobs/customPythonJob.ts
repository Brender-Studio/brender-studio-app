import { Command } from "@tauri-apps/api/shell";

interface CustomPythonJobProps {
    currentProfile: string;
    awsRegion: string;
    jobQueue: string;
    jobDefinition: string;
    jobActionType: string;
    efsBlenderFilePath: string;
    efsBlenderOutputFolderPath: string;
    jobId: string;
    vcpus: string;
    memory: string;
    attempts: string; 
    priority?: number; 
    jobTimeout: string;
    numGPUs: number; 
    jobArraySize: number; 
    useEevee: string;
    useGpus: string;
    bucketName: string;
    bucketKey: string;
    customScriptPath: string;
    customEnvVars: { name: string; value: string }[];
}

export async function customPythonJob({
    currentProfile,
    awsRegion,
    jobQueue,
    jobDefinition,
    jobActionType,
    efsBlenderFilePath,
    efsBlenderOutputFolderPath,
    jobId,
    vcpus,
    memory,
    jobTimeout,
    numGPUs,
    jobArraySize,
    attempts,
    useEevee,
    useGpus,
    bucketName,
    bucketKey,
    customScriptPath,
    customEnvVars,
}: CustomPythonJobProps) {
    try {
        // Resource requirements
        const resourceRequirements = [
            `{type=MEMORY,value=${memory}}`,
            `{type=VCPU,value=${vcpus}}`,
            numGPUs > 0 ? `{type=GPU,value=${numGPUs}}` : '',
        ].filter(Boolean).join(',');

        // Defaul environment variables
        const defaultEnvironmentVariables = [
            `{name=JOB_ACTION_TYPE,value=${jobActionType}}`,
            `{name=EFS_BLENDER_FILE_PATH,value=${efsBlenderFilePath}}`,
            `{name=EFS_BLENDER_OUTPUT_FOLDER_PATH,value=${efsBlenderOutputFolderPath}}`,
            `{name=USE_EEVEE,value=${useEevee}}`,
            `{name=USE_GPU,value=${useGpus}}`,
            `{name=BUCKET_NAME,value=${bucketName}}`,
            `{name=BUCKET_KEY,value=${bucketKey}}`,
            `{name=EFS_MAIN_SCRIPT_PATH,value=${customScriptPath}}`,
        ];


        const customEnvironmentVariables = customEnvVars
            .filter(envVar => envVar.name && envVar.value)
            .map(envVar => `{name=${envVar.name},value=${envVar.value}}`);

        const environmentVariables = defaultEnvironmentVariables.concat(customEnvironmentVariables).join(',');

        // Build the command arguments
        const commandArgs = [
            'batch',
            'submit-job',
            '--job-name',
            `customPythonJob-${bucketKey}`,
            '--job-queue',
            jobQueue,
            '--job-definition',
            jobDefinition,
            '--timeout',
            `attemptDurationSeconds=${jobTimeout}`,
            '--retry-strategy',
            `attempts=${attempts}`,
            '--container-overrides',
            `resourceRequirements=[${resourceRequirements}],environment=[${environmentVariables}]`,
            '--depends-on',
            `jobId=${jobId}`,
            '--region',
            awsRegion,
            '--profile',
            currentProfile,
            '--output',
            'json',
        ];

        if (jobArraySize && jobArraySize > 0) {
            commandArgs.push('--array-properties', `size=${jobArraySize}`);
        }

        // Execute the command
        const command = new Command('aws-cli', commandArgs);
        const output = await command.execute();

        const stderr = output.stderr?.toString() || '';

        if (output.code !== 0) {
            console.error(`Command failed with code ${output.code}`);
            console.error(`stderr: ${stderr}`);
            throw new Error(stderr);
        }

        const stdout = output.stdout?.toString() || '';
        const jobDefinitions = JSON.parse(stdout) || [];
        return jobDefinitions || [];
    } catch (error) {
        console.error('error', error);
        throw new Error('Error submitting custom python job');
    }
}
