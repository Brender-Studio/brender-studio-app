import { Command } from "@tauri-apps/api/shell";
import { getJobQueues } from "../getJobQueues";

// aws batch list-jobs --job-queue JobQueueSpotCPU-9bfc31b5-8cbd-463b-b605-2a4c7f88a1c6 --filters name=JOB_NAME,values="efsTos3-*"

// fn args: [jobQueue, jobNamePrefix, region, profile, stackName]

// Necesitamos primero llamar a la funcion getJobQueues para obtener el nombre de las colas de trabajos

// Luego iterar sobre cada cola de trabajos y llamar a la funcion list-jobs para obtener los trabajos que coincidan con el prefijo
// Intentar usar promesas para hacer las llamadas en paralelo

// Finalmente devolver un array con los trabajos que coincidan con el prefijo ,
// pero debemos devolver solo los trabajos fultrados donde el status sea diferente de SUCCEEDED y FAILED


export async function listJobsByPrefix(jobNamePrefix: string, region: string, profile: string, stackName: string) {
	try {
		const jobQueues = await getJobQueues(stackName, region, profile);

		// console.log('jobQueues', jobQueues);

		const jobPromises = jobQueues.map(async (jobQueue: { jobQueueName: string }) => {
			const jobQueueName = jobQueue.jobQueueName;

			const command = new Command("aws-cli", [
				"batch",
				"list-jobs",
				"--job-queue",
				jobQueueName,
				"--filters",
				`name=JOB_NAME,values="${jobNamePrefix}"`,
				"--query",
				"jobSummaryList[*]",
				"--region",
				region,
				"--profile",
				profile,
				"--output",
				"json"
			]);

			// console.log('command', command);

			const output = await command.execute();

			// console.log('output', output);

			const stderr = output.stderr?.toString() || '';

			if (output.code !== 0) {
				console.error(`Command failed with code ${output.code}`);
				console.error(`stderr: ${stderr}`);
				throw new Error(stderr);
			}

			const stdout = output.stdout?.toString() || '';

			const jobs = JSON.parse(stdout) || [];

			return jobs;
		});

		// Esperamos a que todas las promesas se resuelvan
		const allJobs = await Promise.all(jobPromises);

		// console.log('allJobs', allJobs);

		// Flatten el array de arrays y filtrar los trabajos
		const filteredJobs = allJobs.flat().filter(job => job.status !== 'SUCCEEDED' && job.status !== 'FAILED');

		// console.log('filteredJobs', filteredJobs);

		// Ahora obtenemos los detalles de cada trabajo filtrado
		const detailPromises = filteredJobs.map(async (job: { jobId: string }) => {
			const command = new Command("aws-cli", [
				"batch",
				"describe-jobs",
				"--jobs",
				job.jobId,
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
				throw new Error(stderr);
			}

			const stdout = output.stdout?.toString() || '';

			const jobDetails = JSON.parse(stdout)?.jobs?.[0] || {};

			return jobDetails;
		});

		// Esperamos a que todas las promesas se resuelvan
		const detailedJobs = await Promise.all(detailPromises);

		// console.log('detailedJobs', detailedJobs);

		return detailedJobs;

	} catch (error) {
		if (error instanceof Error) {
			console.log('error', error.message);
			throw error;
		}
	}
}