import { getBuildStatus } from "@/cli-functions/deploy/code-build/getBuildStatus";
import { codeBuildNotificationsQueries } from "@/react-query-utils/query-key-store/queryKeyStore";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQuery } from "@tanstack/react-query";


type BuildStatus = 'IN_PROGRESS' | 'SUCCEEDED' | 'FAILED' | 'STOPPED';

interface BuildNotification {
    startTime: string;
    id: string;
    buildStatus: BuildStatus;
}


interface useGetNotificationStatusProps {
    buildIds: string[] | null;
    isBuildIdsLoading: boolean;
}

const useGetNotificationStatus = ({ buildIds, isBuildIdsLoading }: useGetNotificationStatusProps) => {

    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentAwsRegion, currentProfile, isCliInstalled } = sessionData;

    const notificationCodeBuildStatusQueryKey = codeBuildNotificationsQueries.notificationCodeBuildStatusQueryKey(currentProfile!, currentAwsRegion);

    const notificationCodeBuildStatusQuery = useQuery<BuildNotification[]>({
        queryKey: notificationCodeBuildStatusQueryKey,
        queryFn: () => {
            if (currentAwsRegion && currentProfile && buildIds) {
                return getBuildStatus(currentAwsRegion, currentProfile, buildIds);
            } else {
                return Promise.resolve([]);
            }
        },
        enabled: !!currentAwsRegion && !!currentProfile && isCliInstalled && !!buildIds && !isBuildIdsLoading,
    });

    return {
        ...notificationCodeBuildStatusQuery,
    }
}


export default useGetNotificationStatus;