import { useQueryClient } from "@tanstack/react-query";
import { useNotificationStore } from "@/store/useNotificationStore";
import { useUserSessionStore } from "@/store/useSessionStore";
import { codeBuildNotificationsQueries, codeBuildQueries } from "@/react-query-utils/query-key-store/queryKeyStore";
import { useState } from "react";
import { deploySequenceFn } from "@/features/stacks/deploy-stack/deploy-sequence-fn/deploySequenceFn";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { deployStackSchema } from "@/schemas/deployStackSchema";

export interface UseCodeBuildQueriesProps {
    progressCallback: (step: string) => void;
}

export const useExecuteCodeBuildSequenceQuery = ({ progressCallback }: UseCodeBuildQueriesProps) => {
    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentAwsRegion, currentProfile } = sessionData;
    const navigate = useNavigate();

    const { addCodeBuildNotification } = useNotificationStore();
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();

    const deployStack = async (values: z.infer<typeof deployStackSchema>) => {
        try {
            setIsLoading(true);

            const { success, build, stackName } = await deploySequenceFn({ formData: values, progressCallback });

            if ( success === true ) {
                navigate('/stacks');
                // get object build json
                const buildRes = typeof build === 'string' ? JSON.parse(build) : null;

                const { id, buildStatus, arn, startTime } = buildRes?.build || {};
                // console.log('Build ID:', id)

                const stack = stackName;

                const jsonNotification = {
                    id: id,
                    buildStatus: buildStatus,
                    arn: arn,
                    startTime: startTime,
                    stackName: 'BRENDER-STACK-' + stack
                }

                addCodeBuildNotification(jsonNotification);
            }
            setIsLoading(false);

        } catch (error) {
            console.error(error);
            setIsLoading(false);

            toast({
                title: 'Error',
                description: `An error occurred while deploying the stack. Please try again. ${error}`,
                variant: 'destructive'
            })

            throw new Error(`${error as Error}`)
        }
    };

    const refetchQueries = async () => {
        await queryClient.resetQueries({
            queryKey: codeBuildQueries.codeBuildProjectsQueryKey(currentProfile!, currentAwsRegion),
        })
        await queryClient.resetQueries({
            queryKey: codeBuildQueries.codeBuildStatusQueryKey(currentProfile!, currentAwsRegion),
        })

        await queryClient.refetchQueries({
            queryKey: codeBuildQueries.codeBuildProjectsQueryKey(currentProfile!, currentAwsRegion),
        })

        await queryClient.resetQueries({
            queryKey: codeBuildNotificationsQueries.notificationCodeBuildProjectsQueryKey(currentProfile!, currentAwsRegion),
        })
        await queryClient.resetQueries({
            queryKey: codeBuildNotificationsQueries.notificationCodeBuildStatusQueryKey(currentProfile!, currentAwsRegion),
        })

        await queryClient.refetchQueries({
            queryKey: codeBuildNotificationsQueries.notificationCodeBuildProjectsQueryKey(currentProfile!, currentAwsRegion),
        })

        await queryClient.refetchQueries({
            queryKey: codeBuildNotificationsQueries.notificationCodeBuildStatusQueryKey(currentProfile!, currentAwsRegion),
        })
    };

    return {
        isLoading,
        deployStack,
        refetchQueries,
    };
};
