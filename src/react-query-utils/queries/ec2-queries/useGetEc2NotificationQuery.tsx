import { getEc2Instances } from "@/cli-functions/ec2/getEc2Instances";
import { ec2NotificationQueries } from "@/react-query-utils/query-key-store/queryKeyStore";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQuery } from "@tanstack/react-query";


const useGetEc2NotificationQuery = () => {
    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentAwsRegion, currentProfile } = sessionData;
 
    const ec2NotificationQueryKey =  ec2NotificationQueries.ec2NotificationQueryKey(currentProfile!, currentAwsRegion!);

    const ec2NotificationQuery = useQuery({
        queryKey: ec2NotificationQueryKey,
        queryFn: () => getEc2Instances(currentAwsRegion, currentProfile!),
        retry: 1,
        enabled: !!currentAwsRegion && !!currentProfile,
        refetchInterval: 30000 // 30 seconds
    });

    // console.log('EC2 Notification Query:', ec2NotificationQuery.data)

    return {
        ...ec2NotificationQuery,
    }
}

export default useGetEc2NotificationQuery