import { useUserSessionStore } from "@/store/useSessionStore";
import { useLocation } from "react-router-dom";
import useBucketNameQuery from "./useBucketNameQuery";
import { useQuery } from "@tanstack/react-query";
import { s3Queries } from "@/react-query-utils/query-key-store/queryKeyStore";
import { getPlayblastUrl } from "@/cli-functions/s3-data/getPlayblastUrl";

const usePlayblastQuery = () => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion, currentProfile, currentStack } = getSessionData();

    const currentPathname = useLocation().pathname;

    const { bucketName } = useBucketNameQuery();
    const currentPath = currentPathname.split('/').slice(2).join('/')

    const playblastQuery = useQuery({
        queryKey: s3Queries.s3PlayblastQueryKey(currentStack!, currentAwsRegion, currentProfile!, currentPathname),
        queryFn: () => getPlayblastUrl(bucketName, currentProfile!, currentAwsRegion, currentPath),
        enabled: !!bucketName && !!currentProfile && !!currentAwsRegion,
    });

    return {
        ...playblastQuery,
    }
}

export default usePlayblastQuery