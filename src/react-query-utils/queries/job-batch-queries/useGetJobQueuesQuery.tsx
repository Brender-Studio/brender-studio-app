import { getJobQueues } from '@/cli-functions/batch/getJobQueues'
import { jobQueries } from '@/react-query-utils/query-key-store/queryKeyStore'
import { useUserSessionStore } from '@/store/useSessionStore'
import { useQuery } from '@tanstack/react-query'

interface JobQueuesProps {
    enabled?: boolean
}

const useGetJobQueuesQuery = ({ enabled }: JobQueuesProps) => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion, currentProfile, currentStack } = getSessionData();


    const jobQueues = useQuery({
        queryKey: jobQueries.jobQueuesQueryKey(currentAwsRegion, currentProfile!, currentStack!),
        queryFn: () => getJobQueues(currentStack!, currentAwsRegion, currentProfile!),
        enabled: !!currentStack && !!currentAwsRegion && !!currentProfile && enabled,
    })

    return {
        ...jobQueues,
    }
}

export default useGetJobQueuesQuery