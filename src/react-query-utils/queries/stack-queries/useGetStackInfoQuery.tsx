import { getStackInfo } from '@/cli-functions/stack-data/getStackInfo';
import { stackQueries } from '@/react-query-utils/query-key-store/queryKeyStore';
import { useUserSessionStore } from '@/store/useSessionStore';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

const useGetStackInfoQuery = () => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion, currentProfile } = getSessionData();

    // Get the stack ID from the URL
    const stackId = useLocation().pathname.split('/')[2]
    console.log('Stack ID:', stackId)

    const stackInfoQuery = useQuery({
        queryKey: stackQueries.stackInfoQueryKey(stackId, currentAwsRegion, currentProfile!),
        queryFn: () => getStackInfo(stackId, currentAwsRegion, currentProfile!),
        enabled: !!currentAwsRegion && !!currentProfile && !!stackId,
    });

    return {
        ...stackInfoQuery,
    }
}

export default useGetStackInfoQuery