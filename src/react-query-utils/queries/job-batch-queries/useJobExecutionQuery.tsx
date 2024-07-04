import { listJobsByPrefix } from "@/cli-functions/batch/jobs-data/listJobsByPrefix";
import { jobQueries } from "@/react-query-utils/query-key-store/queryKeyStore";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQuery } from "@tanstack/react-query";


const useJobExecutionsQuery = () => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion, currentProfile, currentStack } = getSessionData();

    const jobExecutionsQueryKey = jobQueries.jobExecutionSimpleQueryKey(currentAwsRegion!, currentProfile!, currentStack!);

    const prefix = 'efsTos3-*'

    const jobExecutionsQuery = useQuery({
        queryKey: jobExecutionsQueryKey,
        queryFn: () => listJobsByPrefix(prefix, currentAwsRegion, currentProfile!, currentStack!),
        enabled: !!currentAwsRegion && !!currentProfile && !!currentStack,
        refetchInterval: 30000, //  30 seconds
    });

    return {
        ...jobExecutionsQuery,
    }
}

export default useJobExecutionsQuery;