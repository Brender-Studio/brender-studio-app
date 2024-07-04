import { getEc2Instances } from "@/cli-functions/ec2/getEc2Instances";
import { ec2Queries } from "@/react-query-utils/query-key-store/queryKeyStore";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQuery } from "@tanstack/react-query";

const useGetEc2InstancesQuery = () => {
  // const { currentAwsRegion, currentProfile , currentStack} = useUserSessionStore();
  const { getSessionData } = useUserSessionStore();
  const sessionData = getSessionData();
  const { currentAwsRegion, currentProfile, currentStack } = sessionData;

  const ec2InstancesQueryKey = ec2Queries.instancesQueryKey(currentAwsRegion!, currentProfile!, currentStack!);

  const ec2InstancesQuery = useQuery({
    queryKey: ec2InstancesQueryKey,
    queryFn: () => getEc2Instances(currentAwsRegion, currentProfile!),
    retry: 1,
    enabled: !!currentAwsRegion && !!currentProfile,
    refetchInterval: 30000 // 30 seconds
  });

  return {
    ...ec2InstancesQuery,
    // ec2Instances: ec2InstancesQuery.data
  }

}

export default useGetEc2InstancesQuery