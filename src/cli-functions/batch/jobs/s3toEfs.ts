import { Command } from "@tauri-apps/api/shell";

interface S3toEfsProps {
    bucketName: string;
    bucketKey: string;
    currentProfile: string;
    awsRegion: string;
    jobQueue: string;
    jobDefinition: string;
    jobActionType: string;
    vcpus: string;
    memory: string;
    attempts?: number;
    priority?: number;
    jobTimeout: string;
    numGPUs: number;
}

export async function s3toEfs(
    {
        bucketName,
        bucketKey,
        currentProfile,
        awsRegion,
        jobQueue,
        jobDefinition,
        jobActionType,
        vcpus,
        memory,
        jobTimeout,
        numGPUs
    }: S3toEfsProps
) {
    try {
        
        const commandArgs = [
            "batch",
            "submit-job",
            "--job-name",
            `s3toEfs-${bucketKey}`,
            "--job-queue",
            jobQueue,
            "--job-definition",
            jobDefinition,
            "--timeout",
            `attemptDurationSeconds=${jobTimeout}`,
            "--container-overrides",
            `resourceRequirements=[{type=MEMORY,value=${memory}},{type=VCPU,value=${vcpus}}` +
            `${numGPUs > 0 ? `,{type=GPU,value=${numGPUs}}` : ''}],` +
            `environment=[{name=JOB_ACTION_TYPE,value=${jobActionType}}` + 
            `, {name=BUCKET_NAME,value=${bucketName}}` + 
            `, {name=BUCKET_KEY,value=${bucketKey}}]`,
            "--region",
            awsRegion,
            "--profile",
            currentProfile,
            "--output",
            "json"
        ];

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
            // console.log('error', error.message)
            throw error;
        }
    }
}