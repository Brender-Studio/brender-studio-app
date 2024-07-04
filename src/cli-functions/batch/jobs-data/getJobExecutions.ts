import { Command } from "@tauri-apps/api/shell";
import { getJobQueues } from "../getJobQueues";

export async function getJobExecutions(region: string, profile: string, stackName: string) {

    try {
        const jobQueues = await getJobQueues(stackName, region, profile);

        // console.log('jobQueues', jobQueues)

        // Array para almacenar las promesas de las consultas para cada cola de trabajos
        const promises: Promise<{ jobQueueName: string, jobQueueArn: string, statusCounts: { [status: string]: number } }>[] = [];

        // Iterar sobre cada cola de trabajos
        for (const jobQueue of jobQueues) {
            // Crear una promesa para cada consulta
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

                // Array para almacenar las promesas de las consultas para cada estado posible
                const statusPromises: Promise<number>[] = [];

                // Iterar sobre cada estado posible
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

                        // Resolver la promesa con la cantidad de trabajos en el estado actual
                        resolveStatus(jobStatuses.length);
                    });

                    statusPromises.push(statusPromise);
                }

                // Esperar a que todas las promesas de estado se resuelvan
                const statusCountsValues = await Promise.all(statusPromises);

                // Asignar los valores de los recuentos de estado
                Object.keys(statusCounts).forEach((status, index) => {
                    statusCounts[status] = statusCountsValues[index];
                });

                resolve({ jobQueueName: jobQueue.jobQueueName, jobQueueArn: jobQueue.jobQueueArn, statusCounts });
            });

            promises.push(promise);
        }

        // Esperar a que todas las promesas se resuelvan
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
