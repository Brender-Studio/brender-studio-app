import { getIdentities } from "@/cli-functions/ses-data/getIdentities";
import { sesQueries } from "@/react-query-utils/query-key-store/queryKeyStore";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQuery } from "@tanstack/react-query";

const useGetSesIdentitiesQuery = () => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion, currentProfile } = getSessionData();

    const sesIdentitiesQueryKey = sesQueries.sesIdentitiesQueryKey(currentAwsRegion, currentProfile!);

    const sesIdentitiesQuery = useQuery({
        queryKey: sesIdentitiesQueryKey,
        queryFn: () => getIdentities(currentAwsRegion, currentProfile!),
        enabled: !!currentAwsRegion && !!currentProfile,
    });

    return {
        ...sesIdentitiesQuery,
    }

}

export default useGetSesIdentitiesQuery