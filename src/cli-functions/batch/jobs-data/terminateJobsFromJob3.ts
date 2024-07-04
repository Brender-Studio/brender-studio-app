import { Command } from "@tauri-apps/api/shell";

interface JobDetails {
    jobId: string;
    status: string;
    dependsOn?: { jobId: string }[];
}

// Función para obtener los detalles de un trabajo dado su ID
async function getJobDetails(jobId: string, region: string, profile: string): Promise<JobDetails> {
    const command = new Command("aws-cli", [
        "batch",
        "describe-jobs",
        "--jobs",
        jobId,
        "--region",
        region,
        "--profile",
        profile,
        "--output",
        "json"
    ]);

    const output = await command.execute();

    if (output.code !== 0) {
        const stderr = output.stderr || '';
        console.error(`Command failed with code ${output.code}`);
        console.error(`stderr: ${stderr}`);
        throw new Error(stderr);
    }

    const stdout = output.stdout || '';
    const jobDetails: JobDetails = JSON.parse(stdout)?.jobs?.[0] || {};

    return jobDetails;
}

// Función recursiva para obtener los detalles de un trabajo y sus dependencias
async function getJobAndDependencies(jobId: string, region: string, profile: string): Promise<JobDetails[]> {
    const jobDetails: JobDetails = await getJobDetails(jobId, region, profile);

    if (jobDetails.dependsOn && jobDetails.dependsOn.length > 0) {
        const dependencies = jobDetails.dependsOn.map(dep => dep.jobId);
        const dependenciesDetailsPromises = dependencies.map(dep => getJobAndDependencies(dep.trim(), region, profile));
        const dependenciesDetailsArrays = await Promise.all(dependenciesDetailsPromises);
        const dependenciesDetails = dependenciesDetailsArrays.flat();
        return [jobDetails, ...dependenciesDetails];
    }

    return [jobDetails];
}

// Función para terminar un trabajo dado su ID
async function terminateJob(jobId: string, region: string, profile: string): Promise<void> {
    const command = new Command("aws-cli", [
        "batch",
        "terminate-job",
        "--job-id",
        jobId,
        "--reason",
        "Terminanting job from job3, user requested.",
        "--region",
        region,
        "--profile",
        profile
    ]);

    const output = await command.execute();

    if (output.code !== 0) {
        const stderr = output.stderr || '';
        console.error(`Command failed with code ${output.code}`);
        console.error(`stderr: ${stderr}`);
        throw new Error(stderr);
    }
}

// Función principal que recibe el ID del job3 y termina los trabajos en orden
export async function terminateJobsFromJob3(job3Id: string, region: string, profile: string): Promise<void> {
    try {
        const jobs = await getJobAndDependencies(job3Id, region, profile);
        const jobsToTerminate = jobs.reverse();

        for (const job of jobsToTerminate) {
            await terminateJob(job.jobId, region, profile);
            console.log(`Terminating job ${job.jobId}`);
        }

        console.log("Jobs have been terminated successfully.");
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
