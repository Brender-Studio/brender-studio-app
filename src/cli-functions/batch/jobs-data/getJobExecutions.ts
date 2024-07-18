import { Command } from "@tauri-apps/api/shell";
import { getJobQueues } from "../getJobQueues";

export async function getJobExecutions(region: string, profile: string, stackName: string) {

    try {
        const jobQueues = await getJobQueues(stackName, region, profile);

        // console.log('jobQueues', jobQueues)

        // Array for storing promises of each query
        const promises: Promise<{ jobQueueName: string, jobQueueArn: string, statusCounts: { [status: string]: number } }>[] = [];

        // Iterate over each job queue
        for (const jobQueue of jobQueues) {
            // Create a promise for each job queue
            const promise = new Promise<{ jobQueueName: string, jobQueueArn: string, statusCounts: { [status: string]: number } }>(async (resolve) => {
                const statusCounts: { [status: string]: number } = {
                    "SUBMITTED": 0,
                    "PENDING": 0,
                    "RUNNABLE": 0,
                    "STARTING": 0,
                    "RUNNING": 0,
                    "SUCCEEDED": 0,
                    "FAILED": 0
                };

                // Array for storing promises of each status
                const statusPromises: Promise<number>[] = [];

                // Iterate over each status
                for (const status of Object.keys(statusCounts)) {
                    const statusPromise = new Promise<number>(async (resolveStatus, rejectStatus) => {
                        const command = new Command("aws-cli", [
                            "batch",
                            "list-jobs",
                            "--job-queue",
                            jobQueue.jobQueueName,
                            "--job-status",
                            status,
                            "--query",
                            "jobSummaryList[*].status",
                            "--region",
                            region,
                            "--profile",
                            profile,
                            "--output",
                            "json"
                        ]);

                        const output = await command.execute();
                        const stderr = output.stderr?.toString() || '';

                        if (output.code !== 0) {
                            console.error(`Command failed with code ${output.code}`);
                            console.error(`stderr: ${stderr}`);
                            rejectStatus(new Error(stderr));
                            return;
                        }

                        const stdout = output.stdout?.toString() || '';
                        const jobStatuses = JSON.parse(stdout) || [];

                        resolveStatus(jobStatuses.length);
                    });

                    statusPromises.push(statusPromise);
                }

                // Wait for all status promises to resolve
                const statusCountsValues = await Promise.all(statusPromises);

                // Assign the values to the statusCounts object
                Object.keys(statusCounts).forEach((status, index) => {
                    statusCounts[status] = statusCountsValues[index];
                });

                resolve({ jobQueueName: jobQueue.jobQueueName, jobQueueArn: jobQueue.jobQueueArn, statusCounts });
            });

            promises.push(promise);
        }


        const results = await Promise.all(promises);
        // console.log('results', results)
        return results;

    } catch (error) {
        if (error instanceof Error) {
            console.log('error', error.message)
            throw error;
        }
    }
}
