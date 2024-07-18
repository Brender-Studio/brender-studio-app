import { getJobsByStatus } from "@/cli-functions/batch/jobs-data/getJobsByStatus";
import { jobQueries } from "@/react-query-utils/query-key-store/queryKeyStore";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQuery } from "@tanstack/react-query";


const useGetJobsByStatusQuery = (jobQueueName: string, jobStatus: string) => {
    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentAwsRegion, currentProfile, currentStack } = sessionData;

    const jobByStatusQueryKey = jobQueries.jobByStatusQueryKey(currentAwsRegion!, currentProfile!, currentStack!, jobStatus, jobQueueName);

    // console.log('jobByStatusQueryKey', jobByStatusQueryKey)

    const jobByStatusQuery = useQuery({
        queryKey: jobByStatusQueryKey,
        queryFn: () => getJobsByStatus(jobQueueName, jobStatus, currentAwsRegion, currentProfile!),
        enabled: !!currentAwsRegion && !!currentProfile && !!currentStack,
    });

    // console.log('jobByStatusQuery', jobByStatusQuery.data)

    return {
        ...jobByStatusQuery
    }

}

export default useGetJobsByStatusQuery