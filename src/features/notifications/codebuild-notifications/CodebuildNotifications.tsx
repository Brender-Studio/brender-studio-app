import React from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Hammer } from "lucide-react";
import NotificationBuildCard from "./NotificationBuildCard";
import { useQueryClient } from "@tanstack/react-query";
import SpinnerButton from '../../../components/custom/spinners/SpinnerButton';
import { useUserSessionStore } from '@/store/useSessionStore';
import { codeBuildNotificationsQueries } from '@/react-query-utils/query-key-store/queryKeyStore';
import useGetNotificationCodebuildProjects from '@/react-query-utils/queries/codebuild-queries/useGetNotificationCodebuildProjects';
import useGetNotificationStatus from '@/react-query-utils/queries/codebuild-queries/useGetNotificationStatus';

const CodebuildNotifications: React.FC = () => {
    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentAwsRegion, currentProfile } = sessionData;

    const queryClient = useQueryClient();

    const { data: buildIds, isLoading: isBuildIdsLoading } = useGetNotificationCodebuildProjects()


    const { data: buildStatus, isLoading: isBuildStatusLoading } = useGetNotificationStatus({ buildIds, isBuildIdsLoading });

    const inProgressBuilds = buildStatus?.filter((build) => build.buildStatus === 'IN_PROGRESS');

    // console.log('Build IDs:', inProgressBuilds);

    const refetchBuildStatus = async () => {
        // console.log('Refetching build status');

        await queryClient.refetchQueries({
            queryKey: codeBuildNotificationsQueries.notificationCodeBuildStatusQueryKey(currentProfile!, currentAwsRegion),
        });
        await queryClient.refetchQueries({
            queryKey: codeBuildNotificationsQueries.notificationCodeBuildProjectsQueryKey(currentProfile!, currentAwsRegion),
        });
    }


    return (
        <>
            <DropdownMenu
                onOpenChange={(open) => {
                    if (open) {
                        console.log('Opening dropdown')
                        refetchBuildStatus();
                    }
                }}
            >
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="link"
                        size="icon"
                        className={"hover:bg-white/10 rounded-full backdrop-blur-sm"}>
                        <div className="relative">
                            <Hammer size={16} />
                            {inProgressBuilds && inProgressBuilds?.length > 0 && (
                                <div className="absolute -top-3 -right-3 ">
                                    <div className="relative text-xs flex items-center justify-center w-4 h-4 bg-red-500 rounded-full">
                                        {inProgressBuilds.length}
                                        <div className='absolute w-6 h-6 flex items-center justify-center bg-red-500/20 animate-pulse rounded-full' />
                                    </div>
                                </div>
                            )}
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-96" align="end">
                    <DropdownMenuLabel>Farm Deploy Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {isBuildStatusLoading || isBuildIdsLoading ? (
                        <div className='flex justify-center py-4'>
                            <SpinnerButton />
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {(inProgressBuilds?.length === 0 || !inProgressBuilds) ? (
                                <div className='flex justify-center items-center min-h-40'>
                                    <p className="text-xs text-center py-2 mx-auto text-muted-foreground">
                                        No in-progress farm builds
                                    </p>
                                </div>
                            ) : (
                                inProgressBuilds.map((notification, index) => (
                                    <div className="gap-2 flex flex-col" key={index}>
                                        <DropdownMenuItem className="bg-card/60 border w-full">
                                            <NotificationBuildCard startedAt={notification.startTime} buildId={notification.id} />
                                        </DropdownMenuItem>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default CodebuildNotifications;
