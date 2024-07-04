import { getEcrImages } from '@/cli-functions/ecr-data/getEcrImages';
import { ecrQueries } from '@/react-query-utils/query-key-store/queryKeyStore';
import { useUserSessionStore } from '@/store/useSessionStore';
import { useQuery } from '@tanstack/react-query';

const useEcrImagesQuery = () => {

    const { getSessionData } = useUserSessionStore();
    const { currentProfile, currentAwsRegion } = getSessionData();

    const ecrImagesQuery = useQuery({
        queryKey: ecrQueries.ecrImagesQueryKey(currentProfile!, currentAwsRegion),
        queryFn: () => getEcrImages(currentAwsRegion, currentProfile!),
        enabled: !!currentAwsRegion && !!currentProfile
    });

    return {
        ...ecrImagesQuery
    }
}

export default useEcrImagesQuery