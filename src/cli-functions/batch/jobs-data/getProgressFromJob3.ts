import { Command } from "@tauri-apps/api/shell";

interface JobDetails {
    id: string;
    status: string;
    dependsOn?: string;
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

// Función recursiva para obtener los detalles de un trabajo y sus dependencias
async function getJobAndDependencies(jobId: string, region: string, profile: string): Promise<JobDetails[]> {
    const jobDetails: JobDetails = await getJobDetails(jobId, region, profile);

    // console.log('jobDetails', jobDetails)

    // Si el trabajo tiene dependencias, obtenemos los detalles de las dependencias de forma recursiva
    if (jobDetails.dependsOn) {
        let dependencies: string[] = [];
        if (Array.isArray(jobDetails.dependsOn)) {
            // Si dependsOn es un array, extraemos los IDs de los trabajos
            dependencies = jobDetails.dependsOn.map(dep => dep.jobId);
        } else {
            // Si dependsOn es una cadena, la dividimos en IDs de trabajos
            dependencies = jobDetails.dependsOn.split(',');
        }
        
        // Obtenemos los detalles de las dependencias de forma recursiva
        const dependenciesDetailsPromises = dependencies.map(dep => getJobAndDependencies(dep.trim(), region, profile));
        const dependenciesDetailsArrays = await Promise.all(dependenciesDetailsPromises);
        const dependenciesDetails = dependenciesDetailsArrays.flat();
        return [jobDetails, ...dependenciesDetails];
    }

    // Si el trabajo no tiene dependencias, simplemente devolvemos sus detalles
    return [jobDetails];
}

// Función para calcular el progreso en función del estado de los trabajos
function calculateProgress(jobs: JobDetails[]): number {
    const totalJobs = jobs.length;
    const completedJobs = jobs.filter(job => job.status === 'SUCCEEDED' || job.status === 'FAILED').length;
    return (completedJobs / totalJobs) * 100;
}

// Función principal que recibe el ID del job3 y devuelve el progreso de los trabajos
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
