import { getCodeBuildIds } from "@/cli-functions/deploy/code-build/getCodeBuildIds";
import { codeBuildNotificationsQueries } from "@/react-query-utils/query-key-store/queryKeyStore";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQuery } from "@tanstack/react-query";


const useGetNotificationCodebuildProjects = () => {
    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentAwsRegion, currentProfile, isCliInstalled } = sessionData;

    const notificationCodeBuildProjectsQueryKey = codeBuildNotificationsQueries.notificationCodeBuildProjectsQueryKey(currentProfile!, currentAwsRegion);

    const notificationCodeBuildProjectsQuery = useQuery({
        queryKey: notificationCodeBuildProjectsQueryKey,
        queryFn: () => {
            if (currentAwsRegion && currentProfile) {
                return getCodeBuildIds(currentAwsRegion, currentProfile);
            } else {
                return Promise.resolve([]);
            }
        },
        enabled: !!currentAwsRegion && !!currentProfile && isCliInstalled,
    });

    return {
        ...notificationCodeBuildProjectsQuery,
    }
}


export default useGetNotificationCodebuildProjects;