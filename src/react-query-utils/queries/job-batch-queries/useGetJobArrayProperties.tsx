import { describeJobs } from "@/cli-functions/batch/jobs-data/describeJobs";
import { jobQueries } from "@/react-query-utils/query-key-store/queryKeyStore";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQuery } from "@tanstack/react-query";

const useGetJobArrayProperties = (jobId: string) => {
    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentAwsRegion, currentProfile, currentStack } = sessionData;

    const jobArrayPropertiesQueryKey = jobQueries.jobArrayPropertiesQueryKey(currentAwsRegion!, currentProfile!, currentStack!, jobId);

    const jobArrayPropertiesQuery = useQuery({
        queryKey: jobArrayPropertiesQueryKey,
        queryFn: () => describeJobs(jobId, currentAwsRegion, currentProfile!),
        enabled: !!currentAwsRegion && !!currentProfile && !!currentStack,
        refetchInterval: 30000 // 30 seconds
    });

    return {
        ...jobArrayPropertiesQuery
    }

}

export default useGetJobArrayProperties