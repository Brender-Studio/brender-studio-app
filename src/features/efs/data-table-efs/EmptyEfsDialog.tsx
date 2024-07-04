import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SpinnerButton from "@/components/custom/spinners/SpinnerButton";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Info } from "lucide-react";
import useGetJobDefinitionsQuery from "@/react-query-utils/queries/job-batch-queries/useGetJobDefinitionsQuery";
import useGetJobQueuesQuery from "@/react-query-utils/queries/job-batch-queries/useGetJobQueuesQuery";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "@tanstack/react-query";
import { emptyEfs } from "@/cli-functions/batch/jobs/emptyEfs";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface EmptyEfsDialogProps {
    currentStack: string
    awsRegion: string
    profile: string
    openDialog: boolean
    setOpenDialog: (open: boolean) => void
}

const EmptyEfsDialog = ({ currentStack, awsRegion, openDialog, setOpenDialog, profile }: EmptyEfsDialogProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const navigate = useNavigate()

    const { data: JobDefinitions } = useGetJobDefinitionsQuery(
        { enabled: openDialog }
    );

    const { data: JobQueues } = useGetJobQueuesQuery({ enabled: openDialog });


    const firstJobDefinition = JobDefinitions && JobDefinitions[0]

    // we need to filet and extract de first job queue ondemand cpu 
    const firstJobQueue = JobQueues && JobQueues.filter((item: { jobQueueName: string; }) => item.jobQueueName.includes('JobQueueOnDemandCPU'))[0]

    const efsJobData = {
        currentProfile: profile,
        currentAwsRegion: awsRegion,
        jobQueue: firstJobQueue?.jobQueueName,
        jobDefinition: firstJobDefinition?.jobDefinitionName,
        jobActionType: "remove_efs",
        vcpus: "1",
        memory: "2048"
    }

    const emptyEfsMutation = useMutation({
        mutationFn: async () => {
            setIsSubmitting(true)
            const res = await emptyEfs(efsJobData)
            return { res }
        },
        onSuccess: () => {
            setIsSubmitting(false)
            setOpenDialog(false)
            setInputValue('')
            toast({
                title: 'EFS Job submitted successfully',
                description: `The job to empty the EFS has been submitted.`,
                variant: 'success'
            })
            navigate('/jobs')
        },
        onError: () => {
            setIsSubmitting(false)
            setOpenDialog(false)
            setInputValue('')
            toast({
                title: 'Error submitting EFS job',
                description: `There was an error submitting the job to empty the EFS.`,
                variant: 'destructive'
            })
        }
    })

    const handleEmptyEfs = () => {
        emptyEfsMutation.mutate()
    }


    return (

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button variant='destructive' size='sm' disabled={!currentStack}>Empty EFS</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Empty EFS for {currentStack} stack
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to empty this EFS? This action will delete all files within the EFS. An AWS Batch job will be triggered to empty the EFS.
                    </DialogDescription>
                    <div className="pt-2"></div>
                    {
                        firstJobQueue && firstJobDefinition ? (
                            <Alert variant='info'>
                                <Info className="h-4 w-4" />
                                <AlertTitle>
                                    Job Queue and Job Definition
                                </AlertTitle>
                                <AlertDescription>
                                    The job will be submitted to the <span className="font-semibold">{firstJobQueue.jobQueueName}</span> job queue using the <span className="font-semibold">{firstJobDefinition.jobDefinitionName}</span> job definition.
                                </AlertDescription>
                            </Alert>
                        ) :
                            (
                                <div>
                                    <Skeleton className="w-full h-36" />
                                </div>
                            )
                    }
                    <Alert variant='warning'>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>
                            Warning
                        </AlertTitle>
                        <AlertDescription>
                            This action is irreversible. If there are rendering jobs in progress, please wait for them to finish before emptying the EFS.
                        </AlertDescription>
                    </Alert>
                </DialogHeader>
                <div className="pb-4">
                    <small className="text-muted-foreground">
                        Type <span className="font-semibold italic">EMPTY</span> to confirm.
                    </small>
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={`Type EMPTY to confirm`}
                        className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <DialogFooter className="pt-4">
                    <DialogClose asChild>
                        <Button variant='outline'>Cancel</Button>
                    </DialogClose>
                    <Button
                        variant='destructive'
                        className={isSubmitting ? 'gap-2 flex' : ''}
                        disabled={isSubmitting || inputValue !== 'EMPTY' || !currentStack || !firstJobQueue || !firstJobDefinition}
                        onClick={handleEmptyEfs}
                    >
                        {isSubmitting && <SpinnerButton />}
                        {isSubmitting ? "Emptying" : "Empty"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EmptyEfsDialog