import { getBucketContents } from "@/cli-functions/s3-data/getBucketContents";
import { s3Queries } from "@/react-query-utils/query-key-store/queryKeyStore";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import useBucketNameQuery from "./useBucketNameQuery";

export interface S3Resource {
    ResourceType: string;
    LogicalResourceId: string;
    PhysicalResourceId: string;
    Timestamp: string;
}

const useBucketStackQueries = () => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion, currentProfile, currentStack } = getSessionData();

    const currentPathname = useLocation().pathname;

    const { bucketName } = useBucketNameQuery();

    const bucketQuery = useQuery({
        queryKey: s3Queries.s3BucketContentsQueryKey(currentStack!, currentAwsRegion, currentProfile!, currentPathname),
        queryFn: () => getBucketContents(bucketName, currentProfile!, currentPathname === '/renders' ? '' : currentPathname.replace('/renders/', '')),
        enabled: !!bucketName && !!currentProfile && !!currentAwsRegion,
    });

    return {
        bucketName,
        bucketQuery
    }
}

export default useBucketStackQueries