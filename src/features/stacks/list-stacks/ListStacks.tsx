import StackCard from "@/components/custom/cards/StackCard"
import { toast } from "@/components/ui/use-toast";
import { getStacksByRegion } from "@/cli-functions/stack-data/getStacksByRegion";
import { useQuery } from "@tanstack/react-query";
import StackDeployCard from "@/components/custom/cards/StackDeployCard";
import CardSkeleton from "@/components/custom/skeletons/CardSkeleton";
import { useNotificationStore } from "@/store/useNotificationStore";
import { useEffect } from "react";
import { useUserSessionStore } from "@/store/useSessionStore";
import { stackQueries } from "@/react-query-utils/query-key-store/queryKeyStore";

interface Stack {
    StackId: string;
    StackName: string;
    StackStatus: string;
    CreationTime: string;
    LastUpdatedTime: string;
}

const ListStacks = () => {
    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentProfile, currentAwsRegion } = sessionData;

    const { codeBuildNotifications, setCodeBuildNotifications, removeCodeBuildNotification } = useNotificationStore()

    const { data, isLoading, isError, error } = useQuery({
        queryKey: stackQueries.stacksQueryKey(currentAwsRegion, currentProfile!),
        queryFn: () => getStacksByRegion(currentAwsRegion, currentProfile!),
        retry: 1,
        enabled: !!currentAwsRegion && !!currentProfile,
        refetchInterval: 30000, // 30 seconds
    });

    // console.log(data)

    if (isError) {
        toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
        })
    }

    const generateSkeletons = () => {
        const skeletons = [];
        for (let i = 0; i < 2; i++) {
            skeletons.push(<CardSkeleton key={i} />);
        }
        return skeletons;
    }

    useEffect(() => {
        if (data) {
            codeBuildNotifications?.forEach((notification) => {
                data.forEach((stack: Stack) => {
                    if (notification.stackName === stack.StackName) {
                        // console.log('Match found:', notification.stackName, stack.StackName);
                       
                        removeCodeBuildNotification(notification);
                    }
                });
            });

        }
    }, [data, codeBuildNotifications, removeCodeBuildNotification, setCodeBuildNotifications]);



    return (
        <div className="grid grid-cols-3 2xl:grid-cols-4 gap-3 py-6">
            <StackDeployCard />
            {
                codeBuildNotifications ? (
                    codeBuildNotifications.map((notification, index) => {
                        return (
                            <div key={`${notification.id}-${index}`}>
                                <CardSkeleton />
                            </div>
                        )
                    })
                ) : null
            }
            {
                isLoading ? (generateSkeletons()) : (
                    <>
                        {data?.map((stack: Stack, index: number) => {
                            const region = stack.StackId.split(':')[3];
                            return (
                                <div key={`${stack.StackId}-${index}`}>
                                    <StackCard
                                        stackId={stack.StackId}
                                        stackName={stack.StackName}
                                        stackRegion={region}
                                        stackStatus={stack.StackStatus}
                                    />
                                </div>
                            );
                        })}
                    </>
                )
            }
        </div>
    )
}

export default ListStacks