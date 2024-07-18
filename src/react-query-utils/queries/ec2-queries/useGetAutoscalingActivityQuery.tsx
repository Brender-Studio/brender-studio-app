import { getAutoscalingActivityLogs } from "@/cli-functions/ec2/getAutoscalingActivityLogs";
import { ec2Queries } from "@/react-query-utils/query-key-store/queryKeyStore";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQuery } from "@tanstack/react-query";

const useGetAutoscalingActivityQuery = ( autoscalingGroupName: string) => {
    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentAwsRegion, currentProfile, currentStack } = sessionData;

    const autoscalingActivityQueryKey = ec2Queries.autoscalingActivityQueryKey(currentAwsRegion!, currentProfile!, currentStack!, autoscalingGroupName);

    const autoscalingActivityQuery = useQuery({
        queryKey: autoscalingActivityQueryKey,
        queryFn: () => getAutoscalingActivityLogs(currentAwsRegion, currentProfile!, autoscalingGroupName),
        enabled: !!currentAwsRegion && !!currentProfile,
    });

    return {
        ...autoscalingActivityQuery,
    }
}

export default useGetAutoscalingActivityQuery