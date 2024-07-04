import { getAutoscalingGroups } from "@/cli-functions/ec2/getAutoscalingGroups";
import { ec2Queries } from "@/react-query-utils/query-key-store/queryKeyStore";
;
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQuery } from "@tanstack/react-query";

const useGetAutoscalingGroupsQuery = () => {
    // const { currentStack, currentAwsRegion, currentProfile } = useUserSessionStore();
    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentAwsRegion, currentProfile, currentStack } = sessionData;

    const autoscalingGroupsQueryKey = ec2Queries.autoscalingGroupsQueryKey(currentAwsRegion!, currentProfile!, currentStack!);

    const autoscalingGroupsQuery = useQuery({
        queryKey: autoscalingGroupsQueryKey,
        queryFn: () => getAutoscalingGroups(currentAwsRegion, currentProfile!, currentStack!),
        retry: 1,
        enabled: !!currentAwsRegion && !!currentProfile,
        // refetchInterval: 30000 // 30 seconds
    });

    return {
        ...autoscalingGroupsQuery,
    }

}

export default useGetAutoscalingGroupsQuery