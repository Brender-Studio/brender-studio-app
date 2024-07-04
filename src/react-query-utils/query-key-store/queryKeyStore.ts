// QUERY STORE FOR REACT QUERY KEYS

// This file contains all the query keys used in the application.

export const stackQueries = {
    bucketNameQueryKey: (currentStack: string, currentAwsRegion: string, currentProfile: string) => ['bucket-name-by-stack', currentStack, currentAwsRegion, currentProfile],
    stacksQueryKey: (currentAwsRegion: string, currentProfile: string) => ['stacks', currentAwsRegion, currentProfile],
    stackDetailQueryKey: (stackId: string, currentAwsRegion: string, currentProfile: string) => ['stack-detail', stackId, currentProfile, currentAwsRegion],
    stackInfoQueryKey: (stackName: string, currentAwsRegion: string, currentProfile: string) => ['stack-info', stackName, currentAwsRegion, currentProfile],
};

export const ec2Queries = {
    instancesQueryKey: (currentAwsRegion: string, currentProfile: string, currentStack: string) => ['ec2-instances', currentAwsRegion, currentProfile, currentStack],
    autoscalingGroupsQueryKey: (currentAwsRegion: string, currentProfile: string, currentStack: string) => ['autoscaling-groups', currentAwsRegion, currentProfile, currentStack],
    autoscalingActivityQueryKey: (currentAwsRegion: string, currentProfile: string, currentStack: string, autoscalingGroupName: string) => ['autoscaling-activity', currentAwsRegion, currentProfile, currentStack, autoscalingGroupName],
};

export const jobQueries = {
    jobQueuesQueryKey: (currentAwsRegion: string, currentProfile: string, currentStack: string) => ['job-queues', currentAwsRegion, currentProfile, currentStack],
    jobExecutionsQueryKey: (currentAwsRegion: string, currentProfile: string, currentStack: string) => ['job-executions', currentAwsRegion, currentProfile, currentStack],
    jobDefinitionQueryKey: (currentAwsRegion: string, currentProfile: string, currentStack: string) => ['job-definitions', currentAwsRegion, currentProfile, currentStack],
    computeEnvQueryKey: (currentAwsRegion: string, currentProfile: string, currentStack: string) => ['compute-envs', currentAwsRegion, currentProfile, currentStack],
    jobByStatusQueryKey: (currentAwsRegion: string, currentProfile: string, currentStack: string, jobStatus: string, jobQueueName: string) => ['jobs-by-status', currentAwsRegion, currentProfile, currentStack, jobStatus, jobQueueName],
    jobArrayPropertiesQueryKey: (currentAwsRegion: string, currentProfile: string, currentStack: string, jobId: string) => ['job-array-properties', currentAwsRegion, currentProfile, currentStack, jobId],
    jobExecutionSimpleQueryKey: (currentAwsRegion: string, currentProfile: string, currentStack: string) => ['job-execution-simple', currentAwsRegion, currentProfile, currentStack],
    jobProgressQueryKey: (currentAwsRegion: string, currentProfile: string, currentStack: string, jobId: string) => ['job-progress', currentAwsRegion, currentProfile, currentStack, jobId],
};

export const codeBuildQueries = {
    codeBuildProjectsQueryKey: (currentProfile: string, currentAwsRegion: string) => ['codebuild-projects', currentAwsRegion, currentProfile],
    codeBuildStatusQueryKey: (currentProfile: string, currentAwsRegion: string) => ['codebuild-status', currentAwsRegion, currentProfile],
};

export const codeBuildNotificationsQueries = {
    notificationCodeBuildProjectsQueryKey: (currentProfile: string, currentAwsRegion: string) => ['codebuild-projects-notifications', currentAwsRegion, currentProfile],
    notificationCodeBuildStatusQueryKey: (currentProfile: string, currentAwsRegion: string) => ['codebuild-status-notifications', currentAwsRegion, currentProfile],
};

export const ec2NotificationQueries = {
    ec2NotificationQueryKey: (currentProfile: string, currentAwsRegion: string) => ['ec2-notifications', currentAwsRegion, currentProfile],
};

export const serviceQuotaQueries = {
    serviceQuotasGpuQueryKey: (currentProfile: string, currentAwsRegion: string) => ['service-quotas-gpu', currentAwsRegion, currentProfile],
    serviceQuotasCpuQueryKey: (currentProfile: string, currentAwsRegion: string) => ['service-quotas-cpu', currentAwsRegion, currentProfile],
    serviceQuotaHistoryQueryKey: (currentProfile: string, currentAwsRegion: string) => ['service-quota-history', currentAwsRegion, currentProfile],
};

export const s3Queries = {
    stackS3QueryKey: (currentStack: string, currentAwsRegion: string, currentProfile: string) => ['stack-s3', currentStack, currentAwsRegion, currentProfile],
    s3BucketContentsQueryKey: (currentStack: string, currentAwsRegion: string, currentProfile: string, pathname: string) => ['s3-bucket-contents', currentStack, currentAwsRegion, currentProfile, pathname === '/renders' ? '' : pathname.replace('/renders/', '')],
    s3ThumbnailQueryKey: (currentStack: string, currentAwsRegion: string, currentProfile: string, pathname: string) => ['s3-thumbnail', currentStack, currentAwsRegion, currentProfile, pathname === '/renders' ? '' : pathname.replace('/renders/', '')],
    s3PlayblastQueryKey: (currentStack: string, currentAwsRegion: string, currentProfile: string, pathname: string) => ['s3-playblast', currentStack, currentAwsRegion, currentProfile, pathname === '/renders' ? '' : pathname.replace('/renders/', '')],
};

export const ecrQueries = {
    ecrImagesQueryKey: (currentAwsRegion: string, currentProfile: string) => ['ecr-images', currentProfile, currentAwsRegion],
};

export const efsQueries = {
    efsQueryKey: (currentStack: string, currentAwsRegion: string, currentProfile: string) => ['efs', currentStack, currentAwsRegion, currentProfile],
};

export const sesQueries = {
    sesIdentitiesQueryKey: (currentAwsRegion: string, currentProfile: string) => ['ses-identities', currentAwsRegion, currentProfile],
    sesTemplatesQueryKey: (currentAwsRegion: string, currentProfile: string) => ['ses-templates', currentAwsRegion, currentProfile],
};

export const costExplorerQueries = {
    costExplorerDailyQueryKey: (currentProfile: string, currentAwsRegion: string, currentStack: string) => ['ce-daily-cost', currentProfile, currentAwsRegion, currentStack],
    costExplorerMonthlyQueryKey: (currentProfile: string, currentAwsRegion: string, currentStack: string) => ['ce-monthly-cost', currentProfile, currentAwsRegion, currentStack],
}