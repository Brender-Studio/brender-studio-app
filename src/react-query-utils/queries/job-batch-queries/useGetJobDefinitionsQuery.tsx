import { getJobDefinitions } from "@/cli-functions/batch/getJobDefinitions";
import { jobQueries } from "@/react-query-utils/query-key-store/queryKeyStore";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQuery } from "@tanstack/react-query";

interface JobDefinitionProps {
  enabled?: boolean
}

const useGetJobDefinitionsQuery = ({ enabled }: JobDefinitionProps) => {
  const { getSessionData } = useUserSessionStore();
  const { currentAwsRegion, currentProfile, currentStack } = getSessionData();

  const jobDefinitionsQueryKey = jobQueries.jobDefinitionQueryKey(currentAwsRegion!, currentProfile!, currentStack!);

  const jobDefinitionsQuery = useQuery({
    queryKey: jobDefinitionsQueryKey,
    queryFn: () => getJobDefinitions(currentStack!, currentAwsRegion, currentProfile!),
    enabled: !!currentAwsRegion && !!currentProfile && !!currentStack && enabled,
  });

  return {
    ...jobDefinitionsQuery,
  }
}

export default useGetJobDefinitionsQuery;