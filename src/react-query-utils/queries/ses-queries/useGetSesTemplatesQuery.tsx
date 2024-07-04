import { getTemplates } from '@/cli-functions/ses-data/getTemplates';
import { sesQueries } from '@/react-query-utils/query-key-store/queryKeyStore';
import { useUserSessionStore } from '@/store/useSessionStore';
import { useQuery } from '@tanstack/react-query';

const useGetSesTemplatesQuery = () => {

    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion, currentProfile } = getSessionData();

    const sesTemplatesQueryKey = sesQueries.sesTemplatesQueryKey(currentAwsRegion, currentProfile!);

    const sesTemplatesQuery = useQuery({
        queryKey: sesTemplatesQueryKey,
        queryFn: () => getTemplates(currentAwsRegion, currentProfile!),
        enabled: !!currentAwsRegion && !!currentProfile,
    });

    return {
        ...sesTemplatesQuery,
    }
}

export default useGetSesTemplatesQuery