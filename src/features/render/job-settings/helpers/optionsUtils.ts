import { JobDefinition, JobQueue } from "../JobSettings.types";
import { mapJobDefinitionName, mapJobQueueName } from "./jobHelpers";

export const getJobDefinitionOptions = (
    filteredJobDefinitions: JobDefinition[] | undefined
): { name: string; value: string }[] => {
    return (
        filteredJobDefinitions?.map((jobDefinition: JobDefinition) => ({
            name: mapJobDefinitionName(jobDefinition.jobDefinitionName),
            value: jobDefinition.jobDefinitionName,
        })) || []
    );
};

export const getJobQueueOptions = (
    filteredJobQueues: JobQueue[] | undefined
): { name: string; value: string }[] => {
    return (
        filteredJobQueues?.map((jobQueue: JobQueue) => ({
            name: mapJobQueueName(jobQueue.jobQueueName),
            value: jobQueue.jobQueueName,
        })) || []
    );
};

export const getInstanceTypeOptions = (currentPathname: string): { name: string; value: string }[] => {
    return (
        currentPathname === '/render-gpu'
            ? ['g5', 'g4dn', 'g3', 'p2'].map((instanceType: string) => ({ name: instanceType, value: instanceType }))
            : ['Optimal', 'c5', 'c4', 'm5', 'm4', 'r5', 'r4', 't3', 't2'].map((instanceType: string) => ({
                name: instanceType,
                value: instanceType,
            }))
    );
};