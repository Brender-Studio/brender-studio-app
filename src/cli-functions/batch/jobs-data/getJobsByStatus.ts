import { Command } from "@tauri-apps/api/shell";


export async function getJobsByStatus(jobQueueName: string, status: string, region: string, profile: string) {
    
    try {
        const command = new Command("aws-cli", [
            "batch",
            "list-jobs",
            "--job-queue",
            jobQueueName,
            "--job-status",
            status,
            "--region",
            region,
            "--profile",
            profile,
            "--output",
            "json"
        ]);

        const output = await command.execute();
        // console.log('jobDefinitions output', output)

        const stderr = output.stderr?.toString() || '';

        if (output.code !== 0) {
            console.error(`Command failed with code ${output.code}`);
            console.error(`stderr: ${stderr}`);
            throw new Error(stderr);
        }

        const stdout = output.stdout?.toString() || '';

        const jobs = JSON.parse(stdout) || [];

        // console.log('jobs', jobs)

        return jobs.jobSummaryList || [];

    } catch (error) {
        if (error instanceof Error) {
            console.log('error', error.message)
            throw error;
        }
    }
}