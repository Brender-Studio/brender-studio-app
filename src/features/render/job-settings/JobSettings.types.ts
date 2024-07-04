export interface JobDefinition {
    jobDefinitionName: string;
    jobDefinitionArn: string;
    status: string;
    containerProperties: {
        image: string;
    }
}

export interface JobQueue {
    jobQueueName: string;
    jobQueueArn: string;
}
