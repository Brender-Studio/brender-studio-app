import { getEfsByStack } from "@/cli-functions/efs-data/getEfsByStack";
import { efsQueries } from "@/react-query-utils/query-key-store/queryKeyStore";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQuery } from "@tanstack/react-query";


const useGetEfsQuery = () => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion, currentProfile, currentStack } = getSessionData();

    const efsQueryKey = efsQueries.efsQueryKey(currentStack!, currentAwsRegion!, currentProfile!);

    // console.log('EFS Query Key:', efsQueryKey)

    const efsQuery = useQuery({
        queryKey: efsQueryKey,
        queryFn: () => getEfsByStack(currentStack!, currentAwsRegion!, currentProfile!),
        enabled: !!currentAwsRegion && !!currentProfile && !!currentStack,
    });

    return {
        ...efsQuery,
    }
}

export default useGetEfsQuery