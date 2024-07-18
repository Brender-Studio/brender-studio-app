import { Command } from "@tauri-apps/api/shell";
import { getJobQueues } from "../getJobQueues";

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

		const allJobs = await Promise.all(jobPromises);

		// console.log('allJobs', allJobs);

		// Filter out jobs that are not in SUCCEEDED or FAILED status
		const filteredJobs = allJobs.flat().filter(job => job.status !== 'SUCCEEDED' && job.status !== 'FAILED');

		// console.log('filteredJobs', filteredJobs);

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