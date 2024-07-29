import { Command } from "@tauri-apps/api/shell";

export async function getJobQueues(stackName: string, region: string, profile: string) {

    try {
        const command = new Command("aws-cli", [
            "batch",
            "describe-job-queues",
            "--query",
            `jobQueues[?tags.StackName=='${stackName}']`,
            "--region",
            region,
            "--profile",
            profile,
            "--output",
            "json"
        ]);


        const output = await command.execute();
        // console.log('jobQueues output', output)
        const stderr = output.stderr?.toString() || '';


        if (output.code !== 0) {
            console.error(`Command failed with code ${output.code}`);
            console.error(`stderr: ${stderr}`);
            throw new Error(stderr);
        }

        const stdout = output.stdout?.toString() || '';
        // console.log('jobQueues stdout', stdout)
        const jobQueues = JSON.parse(stdout) || [];
        // console.log('jobQueues', jobQueues)
        return jobQueues || [];

    } catch (error) {
        if (error instanceof Error) {
            // console.log('error', error.message)
            throw error;
        }
    }
}