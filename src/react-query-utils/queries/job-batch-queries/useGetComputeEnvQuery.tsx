import { getComputeEnvs } from "@/cli-functions/batch/jobs-data/getComputeEnvs";
import { jobQueries } from "@/react-query-utils/query-key-store/queryKeyStore";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQuery } from "@tanstack/react-query";

const useGetComputeEnvQuery = () => {
    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentAwsRegion, currentProfile, currentStack } = sessionData;

    const computeEnvQueryKey = jobQueries.computeEnvQueryKey(currentAwsRegion!, currentProfile!, currentStack!);

    console.log('computeEnvQueryKey', computeEnvQueryKey)

    const computeEnvQuery = useQuery({
        queryKey: computeEnvQueryKey,
        queryFn: () => getComputeEnvs(currentAwsRegion, currentProfile!, currentStack!),
        retry: 1,
        enabled: !!currentAwsRegion && !!currentProfile && !!currentStack,
        //   refetchInterval: 30000 // 30 seconds
    });

    return {
        ...computeEnvQuery,
    }
}

export default useGetComputeEnvQuery