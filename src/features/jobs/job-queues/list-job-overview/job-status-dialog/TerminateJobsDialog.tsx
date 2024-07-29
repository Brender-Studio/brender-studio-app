import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PowerOff } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"
import { terminateJobs } from "@/cli-functions/batch/jobs-data/terminateJobs"
import { jobQueries } from "@/react-query-utils/query-key-store/queryKeyStore"
import { useState } from "react"
import SpinnerButton from "@/components/custom/spinners/SpinnerButton"

interface TerminateJobsDialogProps {
    jobIds: string[]
    title: string
    description: string
    openDialog: boolean
    setOpenDialog: (value: boolean) => void
    awsRegion: string
    awsProfile: string
    currentStack: string
    jobStatus: string
    jobQueueName: string
}

const TerminateJobsDialog = ({ openDialog, setOpenDialog, title, description, jobIds, awsProfile, awsRegion, currentStack, jobQueueName, jobStatus }: TerminateJobsDialogProps) => {
    const [isTerminating, setIsTerminating] = useState(false)

    const queryClient = useQueryClient()

    const handleTerminateJobs = async () => {

        try {
            setIsTerminating(true)
            // console.log('jobIds from fn', jobIds)

            const response = await terminateJobs(jobIds, awsRegion, awsProfile)
            // console.log('response', response)
          
            const jobByStatusQueryKey = jobQueries.jobByStatusQueryKey(awsRegion!, awsProfile!, currentStack!, jobStatus, jobQueueName);
            queryClient.refetchQueries({
                queryKey: jobByStatusQueryKey
            })

            const jobExecutionsQueryKey = jobQueries.jobExecutionsQueryKey(awsRegion, awsProfile, currentStack)
            queryClient.refetchQueries({
                queryKey: jobExecutionsQueryKey
            })

            if (response) {
                // console.log('jobs terminated')
                setOpenDialog(false)
                setIsTerminating(false)
            }
        } catch (error) {
            console.error('error', error)
        } finally {
            setOpenDialog(false)
            setIsTerminating(false)
        }

    }


    return (
        <div className="flex justify-center">
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                    <Button
                        variant="destructive"
                        size='sm'
                        disabled={jobIds.length === 0 || jobStatus === 'SUCCEEDED' || jobStatus === 'FAILED'}
                    >
                        <PowerOff size={16} className="mr-2" />
                        Terminate Jobs
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[1000px]">
                    <DialogHeader>
                        <DialogTitle>
                            {title}
                        </DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                        <div className="py-4 max-h-96 overflow-y-scroll pr-2">
                            {
                                jobIds.map((jobId, index) => (
                                    <div className="pt-4 pl-10" key={index}>
                                        <p className="text-sm text-muted-foreground list-item max-w-sm"> {jobId}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="secondary"
                            size='sm'
                            onClick={() => setOpenDialog(false)}
                        >
                            Cancel
                        </Button>
                        <Button variant="destructive" size='sm'
                            onClick={() => {
                                handleTerminateJobs()
                            }}
                            disabled={isTerminating}
                        >
                            {
                                isTerminating && <span className="mr-2">
                                    <SpinnerButton />
                                </span>
                            }
                            {isTerminating ? 'Terminating' : 'Terminate'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default TerminateJobsDialog