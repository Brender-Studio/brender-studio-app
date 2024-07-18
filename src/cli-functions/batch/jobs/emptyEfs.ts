import { Command } from "@tauri-apps/api/shell";


interface EmptyEfsProps {
    currentProfile: string;
    currentAwsRegion: string;
    jobQueue: string;
    jobDefinition: string;
    jobActionType: string;
    vcpus: string;
    memory: string;
}

export async function emptyEfs({
    currentProfile,
    currentAwsRegion,
    jobQueue,
    jobDefinition,
    jobActionType,
    vcpus,
    memory,
}: EmptyEfsProps) {
    try {

        const command = new Command("aws-cli", [
            "batch",
            "submit-job",
            "--job-name",
            "emptyEfs",
            "--job-queue",
            jobQueue,
            "--job-definition",
            jobDefinition,
            "--container-overrides",
            `resourceRequirements=[{type=MEMORY,value=${memory}},{type=VCPU,value=${vcpus}}],` +
            `environment=[{name=JOB_ACTION_TYPE,value=${jobActionType}}]`,
            "--region",
            currentAwsRegion,
            "--profile",
            currentProfile,
            "--output",
            "json"
        ]);

        // console.log('command', command)

        const commandOutput = await command.execute();

        // console.log('commandOutput', commandOutput)
        const stderr = commandOutput.stderr?.toString() || '';

        if (commandOutput.code !== 0) {
            console.error(`Command failed with code ${commandOutput.code}`);
            console.error(`stderr: ${stderr}`);
            throw new Error(stderr);
        }

        const stdout = commandOutput.stdout?.toString() || '';
        // console.log('stdout', stdout)
        const job = JSON.parse(stdout) || [];
        // console.log('job', job)

        return job; 

    } catch (error) {
        console.error('Error:', error);
        throw new Error(String(error));
    }
}