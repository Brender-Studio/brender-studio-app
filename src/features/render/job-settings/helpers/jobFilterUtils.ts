import { JobDefinition, JobQueue } from "../JobSettings.types";

export const filterJobQueues = (
    JobQueues: JobQueue[] | undefined,
    currentPathname: string
): JobQueue[] => {
    return (
        JobQueues?.filter((jobQueue: JobQueue) =>
            jobQueue.jobQueueName.includes(currentPathname === '/render-cpu' ? 'CPU' : 'GPU')
        ) || []
    );
};

export const filterJobDefinitions = (
    JobDefinitions: JobDefinition[] | undefined,
): JobDefinition[] => {
    // return job definitions that have a jobDefinitionName and status is ACTIVE
    return (
        JobDefinitions?.filter((jobDefinition: JobDefinition) =>
            jobDefinition.jobDefinitionName && jobDefinition.status === 'ACTIVE'
        ) || []
    );
};