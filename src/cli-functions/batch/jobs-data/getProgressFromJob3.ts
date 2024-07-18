import { Command } from "@tauri-apps/api/shell";

interface JobDetails {
    id: string;
    status: string;
    dependsOn?: string;
}

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

    // console.log('output', output)

    if (output.code !== 0) {
        const stderr = output.stderr?.toString() || '';
        console.error(`Command failed with code ${output.code}`);
        console.error(`stderr: ${stderr}`);
        throw new Error(stderr);
    }

    const stdout = output.stdout?.toString() || '';
    const jobDetails: JobDetails = JSON.parse(stdout)?.jobs?.[0] || {};

    return jobDetails;
}

// Function to get the details of a job and its dependencies recursively
async function getJobAndDependencies(jobId: string, region: string, profile: string): Promise<JobDetails[]> {
    const jobDetails: JobDetails = await getJobDetails(jobId, region, profile);

    // console.log('jobDetails', jobDetails)

    // If the job has dependencies, we need to get the details of those dependencies
    if (jobDetails.dependsOn) {
        let dependencies: string[] = [];
        if (Array.isArray(jobDetails.dependsOn)) {
            // If dependsOn is an array, we get the job IDs
            dependencies = jobDetails.dependsOn.map(dep => dep.jobId);
        } else {
            // If dependsOn is a string, we split it by comma and trim the values
            dependencies = jobDetails.dependsOn.split(',');
        }
        
        const dependenciesDetailsPromises = dependencies.map(dep => getJobAndDependencies(dep.trim(), region, profile));
        const dependenciesDetailsArrays = await Promise.all(dependenciesDetailsPromises);
        const dependenciesDetails = dependenciesDetailsArrays.flat();
        return [jobDetails, ...dependenciesDetails];
    }

    return [jobDetails];
}

// Function to calculate the progress based on the status of the jobs
function calculateProgress(jobs: JobDetails[]): number {
    const totalJobs = jobs.length;
    const completedJobs = jobs.filter(job => job.status === 'SUCCEEDED' || job.status === 'FAILED').length;
    return (completedJobs / totalJobs) * 100;
}

// Function to get the progress of a job and its dependencies
export async function getProgressFromJob3(job3Id: string, region: string, profile: string): Promise<number> {
    try {
        const jobs = await getJobAndDependencies(job3Id, region, profile);
        const progress = calculateProgress(jobs);
        return progress;
    } catch (error) {
        console.error('Error:', error);
        return 0;
    }
}
