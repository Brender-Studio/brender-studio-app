import { getEc2ServiceQuotasCpu } from "@/cli-functions/service-quotas/getEc2ServiceQuotasCpu";
import { serviceQuotaQueries } from "@/react-query-utils/query-key-store/queryKeyStore";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQuery } from "@tanstack/react-query";


export const useGetServiceQuotaCpuQuery = () => {
    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentAwsRegion, currentProfile } = sessionData;

    const serviceQuotaQueryKey = serviceQuotaQueries.serviceQuotasCpuQueryKey(currentProfile!, currentAwsRegion);


    const serviceQuotaQuery = useQuery({
        queryKey: serviceQuotaQueryKey,
        queryFn: () => getEc2ServiceQuotasCpu(currentProfile!, currentAwsRegion),
        retry: 1,
        enabled: !!currentAwsRegion && !!currentProfile,
    });

    return {
        ...serviceQuotaQuery,
    }
    
}

export default useGetServiceQuotaCpuQuery