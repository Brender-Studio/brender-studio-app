import { Command } from "@tauri-apps/api/shell";

interface RenderJobProps {
    currentProfile: string;
    awsRegion: string;
    bucketKey: string;
    jobQueue: string;
    jobDefinition: string;
    jobActionType: string;
    efsBlenderFilePath: string;
    efsBlenderOutputFolderPath: string;
    renderJsonCommand: string;
    jobId: string;
    vcpus: string;
    memory: string;
    attempts: string; // todo: add to the interface
    priority?: number; // todo: add to the interface
    jobTimeout: string;
    numGPUs: number; // todo: add to the interface
    jobArraySize: number; // todo: add to the interface
}

export async function renderJob(
    {
        currentProfile,
        awsRegion,
        jobQueue,
        bucketKey,
        jobDefinition,
        jobActionType,
        efsBlenderFilePath,
        efsBlenderOutputFolderPath,
        renderJsonCommand,
        jobId,
        vcpus,
        memory,
        jobTimeout,
        numGPUs,
        jobArraySize,
        attempts
    }: RenderJobProps
) {
    try {

        console.log('numGPUs', numGPUs)

        const commandArgs = [
            "batch",
            "submit-job",
            "--job-name",
            `renderJob-${bucketKey}`,
            "--job-queue",
            jobQueue,
            "--job-definition",
            jobDefinition,
            "--timeout",
            `attemptDurationSeconds=${jobTimeout}`,
            "--retry-strategy",
            `attempts=${attempts}`,
            "--container-overrides",
            `resourceRequirements=[{type=MEMORY,value=${memory}},{type=VCPU,value=${vcpus}}` +
            `${numGPUs > 0 ? `,{type=GPU,value=${numGPUs}}` : ''}],` +
            `environment=[{name=JOB_ACTION_TYPE,value=${jobActionType}}` +
            `, {name=EFS_BLENDER_FILE_PATH,value=${efsBlenderFilePath}}` +
            `, {name=EFS_BLENDER_OUTPUT_FOLDER_PATH,value=${efsBlenderOutputFolderPath}}]` +
            `, command="${renderJsonCommand}"`,
            "--depends-on",
            `jobId=${jobId}`,
            "--region",
            awsRegion,
            "--profile",
            currentProfile,
            "--output",
            "json"
        ];


        // Verifica si jobArraySize es mayor que cero y agrega la opción --array-properties al comando si es así
        if (jobArraySize && jobArraySize > 0) {
            commandArgs.push("--array-properties", `size=${jobArraySize}`);
        }

        const command = new Command("aws-cli", commandArgs);

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
        if (error instanceof Error) {
            console.log('error', error.message)
            throw error;
        }
    }
}