import { getJobExecutions } from "@/cli-functions/batch/jobs-data/getJobExecutions";
import { jobQueries } from "@/react-query-utils/query-key-store/queryKeyStore";
;
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQuery } from "@tanstack/react-query";


const useGetJobExecutionQuery = () => {
  const { getSessionData } = useUserSessionStore();
  const sessionData = getSessionData();
  const { currentAwsRegion, currentProfile, currentStack } = sessionData;

  const jobExecutionsQueryKey = jobQueries.jobExecutionsQueryKey(currentAwsRegion!, currentProfile!, currentStack!);
  // console.log('jobExecutionsQueryKey', jobExecutionsQueryKey)

  const jobExecutionsQuery = useQuery({
    queryKey: jobExecutionsQueryKey,
    queryFn: () => getJobExecutions(currentAwsRegion, currentProfile!, currentStack!),
    retry: 1,
    enabled: !!currentAwsRegion && !!currentProfile && !!currentStack,
    refetchInterval: 30000 // 30 seconds
  });

  return {
    ...jobExecutionsQuery,
  }

}

export default useGetJobExecutionQuery;