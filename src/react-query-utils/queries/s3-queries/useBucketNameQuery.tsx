import { getStackDetails } from '@/cli-functions/stack-data/getStackDetails'
import { useQuery } from '@tanstack/react-query'
import { S3Resource } from '@/features/render-contents/bucket-contents/RenderBucketContents';
import { stackQueries } from '@/react-query-utils/query-key-store/queryKeyStore';
import { useUserSessionStore } from '@/store/useSessionStore';

const S3_RESOURCE_TYPE = "AWS::S3::Bucket";

const useBucketNameQuery = () => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion, currentProfile, currentStack } = getSessionData();

    const stackBucketNameQuery = useQuery({
        queryKey: stackQueries.bucketNameQueryKey(currentStack!, currentAwsRegion, currentProfile!),
        queryFn: () => getStackDetails(currentStack!, currentAwsRegion, currentProfile!),
        enabled: !!currentStack && !!currentAwsRegion && !!currentProfile,
        retry: 1,
    });

    // Retornar el bucket name 
    // return stackQuery.data?.find((resource: S3Resource) => resource.ResourceType === S3_RESOURCE_TYPE)?.PhysicalResourceId || null;
    return {
        ...stackBucketNameQuery,
        bucketName: stackBucketNameQuery.data?.find((resource: S3Resource) => resource.ResourceType === S3_RESOURCE_TYPE)?.PhysicalResourceId || null
    };

};

export default useBucketNameQuery;
