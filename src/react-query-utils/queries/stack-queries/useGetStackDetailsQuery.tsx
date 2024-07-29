import { getStackDetails } from "@/cli-functions/stack-data/getStackDetails";
import { stackQueries } from "@/react-query-utils/query-key-store/queryKeyStore";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";


const useGetStackDetailsQuery = () => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion, currentProfile } = getSessionData();

    // Get the stack ID from the URL
    const stackId = useLocation().pathname.split('/')[2]
    // console.log('Stack ID:', stackId)

    const stackDetailQuery = useQuery({
        queryKey: stackQueries.stackDetailQueryKey(stackId, currentAwsRegion, currentProfile!),
        queryFn: () => getStackDetails(stackId, currentAwsRegion, currentProfile!),
        enabled: !!currentAwsRegion && !!currentProfile && !!stackId,
        refetchInterval: 30000
    });

    return {
        ...stackDetailQuery,
        currentAwsRegion
    }

}

export default useGetStackDetailsQuery