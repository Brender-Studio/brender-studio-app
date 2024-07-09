import { RunningJob } from "./columns";


interface Job {
    container: {
        environment: {
            name: string;
            value: string;
        }[];
    };
    jobQueue: string;
    createdAt: number;
    jobId: string;
    status: string;
    dependsOn: {
        jobId: string;
    }[];
}


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

export const mapToRunningJob = (job: Job): RunningJob => {
    const projectName = job.container.environment.find((env) => env.name === "BUCKET_KEY")?.value || "";
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
