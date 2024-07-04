import { getProgressFromJob3 } from "@/cli-functions/batch/jobs-data/getProgressFromJob3";
import { useUserSessionStore } from "@/store/useSessionStore";
import { jobQueries } from '@/react-query-utils/query-key-store/queryKeyStore';
import { useQuery } from "@tanstack/react-query";

const useJobProgress = (job3Id: string) => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion, currentProfile, currentStack } = getSessionData();

    const jobProgressKey = jobQueries.jobProgressQueryKey(currentAwsRegion!, currentProfile!, currentStack!, job3Id);

    const jobProgressQuery = useQuery({
        queryKey: jobProgressKey,
        queryFn: async () => {
            const details = await getProgressFromJob3(job3Id, currentAwsRegion, currentProfile!);
            return details === 0 ? 5 : Math.min(Math.max(details, 0), 100);
        },
        enabled: !!currentAwsRegion && !!currentProfile && !!currentStack && !!job3Id,
        refetchInterval: 30000, //  30 seconds
    });

    return {
        ...jobProgressQuery,
    }
};

export default useJobProgress;
