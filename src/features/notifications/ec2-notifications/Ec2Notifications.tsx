import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import useGetEc2NotificationQuery from "@/react-query-utils/queries/ec2-queries/useGetEc2NotificationQuery";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQueryClient } from "@tanstack/react-query";
import { Server } from "lucide-react";
import { Ec2Instances } from "../../instances/list-instances/columns";
import { ec2NotificationQueries } from "@/react-query-utils/query-key-store/queryKeyStore";
import SpinnerButton from "@/components/custom/spinners/SpinnerButton";
import NotificationEc2Card from "./NotificationEc2Card";


const Ec2Notifications = () => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion, currentProfile } = getSessionData();

    const queryClient = useQueryClient();

    const { data: runningEc2Instances, isLoading: isRunningEc2InstancesLoading } = useGetEc2NotificationQuery();

    const refetchRunningEc2 = async () => {

        await queryClient.refetchQueries({
            queryKey: ec2NotificationQueries.ec2NotificationQueryKey(currentProfile!, currentAwsRegion),
        });

    }

    // Filter only running instances from the list
    const runningInstances = Array.isArray(runningEc2Instances) ? runningEc2Instances.filter((instance: Ec2Instances) => instance.instanceStatus.toUpperCase() === 'RUNNING') : [];

    return (
        <>
            <DropdownMenu
                onOpenChange={(open) => {
                    if (open) {
                        console.log('Opening dropdown')
                        refetchRunningEc2();
                    }
                }}
            >
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="link"
                        size="icon"
                        className={"hover:bg-white/10 rounded-full backdrop-blur-sm"}>
                        <div className="relative">
                            <Server size={16} />
                            {
                                runningInstances && runningInstances?.length > 0 && (
                                    <div className="absolute -top-3 -right-3">
                                        <div className="relative text-xs flex items-center justify-center w-4 h-4 bg-red-500 rounded-full">
                                            {runningInstances.length}
                                            <div className='absolute w-6 h-6 flex items-center justify-center bg-red-500/20 animate-pulse rounded-full' />
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-96 overflow-y-auto max-h-96" align="end">
                    <DropdownMenuLabel>
                        Servers Notifications
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {
                        isRunningEc2InstancesLoading ? (
                            <div className='flex justify-center py-4'>
                                <SpinnerButton />
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {
                                    !runningInstances || runningInstances.length === 0 && (
                                        <div className='flex justify-center items-center min-h-40'>
                                            <p className="text-xs text-center py-2 mx-auto text-muted-foreground">
                                                No running EC2 servers
                                            </p>
                                        </div>
                                    )
                                }
                                {
                                    runningInstances && runningInstances.map((instance: Ec2Instances) => (
                                        <div key={instance.id} className="flex flex-col">
                                            <DropdownMenuItem className="bg-card/60 border w-full">
                                                <NotificationEc2Card
                                                    id={instance.id}
                                                    instanceType={instance.instanceType}
                                                    availabilityZone={instance.availabilityZone}
                                                    instanceStatus={instance.instanceStatus}
                                                />
                                            </DropdownMenuItem>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }

                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default Ec2Notifications;
