import { useUserSessionStore } from "@/store/useSessionStore";
import { useLocation } from "react-router-dom";
import useBucketNameQuery from "./useBucketNameQuery";
import { useQuery } from "@tanstack/react-query";
import { s3Queries } from "@/react-query-utils/query-key-store/queryKeyStore";
import { getThumbnailUrl } from "@/cli-functions/s3-data/getThumbnailUrl";

const useThumbnailQuery = (itemName: string) => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion, currentProfile, currentStack } = getSessionData();

    const currentPathname = useLocation().pathname;

    const { bucketName } = useBucketNameQuery();
    const currentPath = currentPathname.split('/').slice(2).join('/')

    const thumbnailQuery = useQuery({
        queryKey: s3Queries.s3ThumbnailQueryKey(currentStack!, currentAwsRegion, currentProfile!, currentPathname),
        queryFn: () => getThumbnailUrl(bucketName, currentProfile!, currentAwsRegion, currentPath + '/' + itemName),
        enabled: !!bucketName && !!currentProfile && !!currentAwsRegion,
    });

    return {
        ...thumbnailQuery,
    }
}

export default useThumbnailQuery