import { getEc2ServiceQuotasGpu } from "@/cli-functions/service-quotas/getEc2ServiceQuotasGpu";
import { serviceQuotaQueries } from "@/react-query-utils/query-key-store/queryKeyStore";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQuery } from "@tanstack/react-query";


export const useGetServiceQuotaGpuQuery = () => {
    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentAwsRegion, currentProfile } = sessionData;

    const serviceQuotaQueryKey = serviceQuotaQueries.serviceQuotasGpuQueryKey(currentProfile!, currentAwsRegion);


    const serviceQuotaQuery = useQuery({
        queryKey: serviceQuotaQueryKey,
        queryFn: () => getEc2ServiceQuotasGpu(currentProfile!, currentAwsRegion),
        retry: 1,
        enabled: !!currentAwsRegion && !!currentProfile,
        // refetchInterval: 30000 // 30 seconds
    });

    return {
        ...serviceQuotaQuery,
    }
    
}

export default useGetServiceQuotaGpuQuery