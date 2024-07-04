import { useQuery } from '@tanstack/react-query';
import { getCodeBuildIds } from '@/cli-functions/deploy/code-build/getCodeBuildIds';
import { getBuildStatus } from '@/cli-functions/deploy/code-build/getBuildStatus';
import { useUserSessionStore } from '@/store/useSessionStore';
import { codeBuildQueries } from '@/react-query-utils/query-key-store/queryKeyStore';

const useGetCodebuildQueries = () => {
    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentAwsRegion, currentProfile } = sessionData;

    const codeBuildProjectsQuery = useQuery({
        queryKey: codeBuildQueries.codeBuildProjectsQueryKey(currentProfile!, currentAwsRegion),
        queryFn: () => getCodeBuildIds(currentAwsRegion, currentProfile!),
        retry: 1,
        refetchInterval: 30000, // Refetch every 30 seconds
        enabled: !!currentAwsRegion && !!currentProfile
    });

    const codeBuildStatusQuery = useQuery({
        queryKey: codeBuildQueries.codeBuildStatusQueryKey(currentProfile!, currentAwsRegion),
        queryFn: () => getBuildStatus(currentAwsRegion, currentProfile!, codeBuildProjectsQuery.data || []),
        retry: 1,
        enabled: !!codeBuildProjectsQuery.data && !!currentAwsRegion && !!currentProfile,
        refetchInterval: 30000 // Refetch every 30 seconds
    });

    return {
        codeBuildProjectsQuery,
        codeBuildStatusQuery
    };
};

export default useGetCodebuildQueries;
