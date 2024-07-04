import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type queryKey = string[];

const useRefreshQuery = (queryKey: queryKey) => {

    const [isRefreshing, setIsRefreshing] = useState(false);
    const queryClient = useQueryClient();

    const refreshQuery = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            queryClient.refetchQueries({
                // queryKey: queryKeyGenerator(currentProfile, currentAwsRegion),
                queryKey: queryKey,
            });
            setIsRefreshing(false);
        }, 1000);
    };

    return { refreshQuery, isRefreshing };
};

export default useRefreshQuery;