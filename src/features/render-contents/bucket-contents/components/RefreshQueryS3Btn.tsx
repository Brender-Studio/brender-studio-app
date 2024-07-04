import { Button } from "@/components/ui/button"
import { s3Queries } from "@/react-query-utils/query-key-store/queryKeyStore";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, RefreshCcw } from "lucide-react"
import { useState } from "react";
import { useLocation } from "react-router-dom";

const RefreshQueryS3Btn = () => {
    const queryClient = useQueryClient();
    const { getSessionData } = useUserSessionStore();
    const { currentProfile, currentAwsRegion, currentStack } = getSessionData();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const currentPathname = useLocation().pathname;

    const handleRefresh = () => {
        setIsRefreshing(true);
        queryClient.resetQueries({
            queryKey: s3Queries.s3BucketContentsQueryKey(currentStack!, currentAwsRegion, currentProfile!, currentPathname === '/renders' ? '' : currentPathname.replace('/renders/', ''))
        });
        setTimeout(() => {
            setIsRefreshing(false);
        }, 1000);
    }

    return (
        <Button size='iconButton' variant='outline' onClick={handleRefresh}>
            {isRefreshing ? <Loader2 size={16} className="animate-spin" /> : <RefreshCcw size={16} />}
        </Button>
    )
}

export default RefreshQueryS3Btn