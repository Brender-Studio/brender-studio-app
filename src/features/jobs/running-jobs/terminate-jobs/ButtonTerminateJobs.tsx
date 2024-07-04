import { terminateJobsFromJob3 } from "@/cli-functions/batch/jobs-data/terminateJobsFromJob3";
import SpinnerButton from "@/components/custom/spinners/SpinnerButton";
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useState } from "react";

interface ButtonTerminateJobsProps {
    jobId3: string
}

const ButtonTerminateJobs = ({ jobId3 }: ButtonTerminateJobsProps) => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion, currentProfile } = getSessionData();
    const [isLoading, setIsLoading] = useState(false);

    const handleTerminate = async () => {
        try {
            setIsLoading(true)
            await terminateJobsFromJob3(jobId3, currentAwsRegion, currentProfile!)

            toast({
                title: 'Terminating jobs',
                description: `Jobs are being terminated. Please wait a few seconds and refresh the page.`,
                variant: 'success'
            })

        } catch (error) {
            console.error('Error terminating job', jobId3, error)
            toast({
                title: 'Error terminating job',
                description: (error as Error).message, 
                variant: 'destructive'
            })
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div>
            <Button
                variant='destructive'
                size={'sm'}
                onClick={() => {
                    console.log('Terminating job', jobId3)
                    handleTerminate()
                }}
                disabled={isLoading}
                className={isLoading ? 'cursor-not-allowed gap-2 w-full' : 'w-full'}
            >
                {isLoading && <SpinnerButton />}
                {isLoading ? 'Terminating' : 'Terminate'}
            </Button>
        </div>
    )
}

export default ButtonTerminateJobs