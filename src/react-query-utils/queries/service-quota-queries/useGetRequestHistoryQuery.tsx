import { getRequestHistory } from "@/cli-functions/service-quotas/getRequestHistory";
import { serviceQuotaQueries } from "@/react-query-utils/query-key-store/queryKeyStore";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQuery } from "@tanstack/react-query";


export const useGetRequestHistoryQuery = () => {
    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentAwsRegion, currentProfile } = sessionData;

    const requestHistoryQueryKey = serviceQuotaQueries.serviceQuotaHistoryQueryKey(currentProfile!, currentAwsRegion);

    const requestHistoryQuery = useQuery({
        queryKey: requestHistoryQueryKey,
        queryFn: () => getRequestHistory(currentProfile!, currentAwsRegion),
        enabled: !!currentAwsRegion && !!currentProfile,
    });

    return {
        ...requestHistoryQuery,
    }

}

export default useGetRequestHistoryQuery