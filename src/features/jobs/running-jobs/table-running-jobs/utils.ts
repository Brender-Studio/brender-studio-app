import { RunningJob } from "./columns";

// Utilidad para convertir el timestamp a una fecha legible
const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toISOString();
};


const getQueueType = (jobQueue: string): string => {
    return jobQueue.toUpperCase().includes('SPOT') ? 'spot' : 'on-demand';
};

const getComputeType = (jobQueue: string): string => {
    return jobQueue.toUpperCase().includes('GPU') ? 'gpu' : 'cpu';
};

export const mapToRunningJob = (job: any): RunningJob => {
    const projectName = job.container.environment.find((env: any) => env.name === "BUCKET_KEY")?.value || "";
    const queueType = getQueueType(job.jobQueue);
    const createdAt = formatDate(job.createdAt);
    const computeType = getComputeType(job.jobQueue);
    const job3Id = job.jobId;
    const job3Status = job.status;
    const dependsOn = job.dependsOn[0]?.jobId || "";

    return {
        projectName,
        queueType,
        createdAt,
        computeType,
        job3Id,
        job3Status,
        dependsOn
    };
};
