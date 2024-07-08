import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import SpinnerButton from "@/components/custom/spinners/SpinnerButton"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"
import { Check } from "lucide-react"
import { PROGRESS_STEPS } from "@/constants/progress/progressConstants"
import { useExecuteCodeBuildSequenceQuery } from "@/react-query-utils/queries/codebuild-queries/useExecuteCodeBuildSequenceQuery"
import { Card } from "@/components/ui/card"


interface ConfirmDeployDialogProps {
    openDialog: boolean
    setOpenDialog: (value: boolean) => void
    form: any
    title: string
    description: string
}

const ConfirmDeployDialog = ({ openDialog, setOpenDialog, form, title, description }: ConfirmDeployDialogProps) => {
    const [progress, setProgress] = useState<{ [key: string]: boolean }>({
        [PROGRESS_STEPS.CHECKING_SES_TEMPLATES]: false,
        [PROGRESS_STEPS.CREATING_SES_TEMPLATE]: false,
        [PROGRESS_STEPS.CHECKING_CODE_BUILD_ROLE]: false,
        [PROGRESS_STEPS.CREATING_CODE_BUILD_ROLE]: false,
        [PROGRESS_STEPS.CHECKING_CODE_COMMIT]: false,
        [PROGRESS_STEPS.CREATING_CODE_COMMIT]: false,
        [PROGRESS_STEPS.UPLOADING_BUILDSPEC_YML]: false,
        [PROGRESS_STEPS.CHECKING_CODE_BUILD]: false,
        [PROGRESS_STEPS.CREATING_CODE_BUILD]: false,
        [PROGRESS_STEPS.STARTING_CODE_BUILD]: false,
    });


    const progressCallback = (step: string) => {
        if (!progress[step]) {
            setProgress(prevProgress => ({
                ...prevProgress,
                [step]: true,
            }));
        }
    };

    const { isLoading, deployStack, refetchQueries } = useExecuteCodeBuildSequenceQuery({ progressCallback });

    const progressList = Object.entries(progress).map(([step, completed]) => (
        <div key={step} className="text-muted-foreground text-sm mb-2">
            {completed ? (
                <div className="flex items-center gap-2">
                    <span className="bg-green-500 rounded-full p-1 transition-colors duration-700">
                        <Check size={10} className="text-white" strokeWidth={4} />
                    </span>
                    {step}
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <SpinnerButton />
                    {step}
                </div>
            )}
        </div>
    ));

    const onSubmit = async (values: any) => {
        try {
            await deployStack(values);
            console.log('Deploying stack', values)
            toast({
                title: 'Success',
                description: 'The stack is being deployed. Check the status in the Builds page.',
                variant: 'success',
                duration: 2000,
            })
            await refetchQueries();
        } catch (error) {
            console.error("Error during onSubmit:", error);
            toast({
                title: 'Error',
                description: ` ${(error as Error).message}`,
                variant: 'destructive'
            })
        }
    };

    const KeyValueConfirm = ({ keyName, value }: any) => (
        <p className="text-sm font-semibold">
            {keyName}: <span className="font-normal text-muted-foreground text-sm">{value}</span>
        </p>
    );

    const hasErrors = Object.keys(form.formState.errors).length > 0;


    // console.log(form.getValues())
    return (
        <div className="flex justify-center">
            <Dialog open={openDialog}
                // onOpenChange={setOpenDialog}
                onOpenChange={(open) => {
                    if (open || (!open && !isLoading)) {
                        setOpenDialog(open);
                    }
                }}
            >
                <DialogTrigger asChild>
                    <Button
                        type="button"
                        disabled={!form.getValues().stackName || !form.getValues().region || hasErrors}
                    >
                        Review & Deploy
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>
                            {title}
                        </DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                        {
                            !isLoading ? (
                                <div className="py-4 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                                    <div className="space-y-1">
                                        <p className="font-semibold">
                                            Stack details
                                        </p>
                                        <Card className="p-4">
                                            <KeyValueConfirm keyName="Farm Stack Name" value={`BRENDER-STACK-${form.getValues().stackName}`} />
                                            <KeyValueConfirm keyName="Region" value={form.getValues().region} />
                                            <KeyValueConfirm keyName="Profile" value={form.getValues().profile} />
                                        </Card>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-semibold">
                                            Networking details
                                        </p>
                                        <Card className="p-4">
                                            <KeyValueConfirm keyName="VPC" value={form.getValues().isPrivate ? 'Private subnets' : 'Public subnets (No additional cost)'} />
                                        </Card>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-semibold">
                                            Blender Docker images
                                        </p>
                                        <Card className="p-4">
                                            <KeyValueConfirm keyName="Blender Versions" value={form.getValues().blenderVersions.join(', ')} />
                                        </Card>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-semibold">
                                            Compute resources
                                        </p>
                                        <Card className="p-4">
                                            <KeyValueConfirm keyName="On-Demand CPUs" value={`${form.getValues().maxvCpus.onDemandCPU} vCPUs`} />
                                            <KeyValueConfirm keyName="Spot CPUs" value={`${form.getValues().maxvCpus.spotCPU} vCPUs`} />
                                            <KeyValueConfirm keyName="On-Demand GPUs" value={`${form.getValues().maxvCpus.onDemandGPU} vCPUs`} />
                                            <KeyValueConfirm keyName="Spot GPUs" value={`${form.getValues().maxvCpus.spotGPU} vCPUs`} />
                                        </Card>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-semibold">
                                            Spot instance bid percentage
                                        </p>
                                        <Card className="p-4">
                                            <KeyValueConfirm keyName="Spot CPU" value={`${form.getValues().spotBidPercentage.spotCPU} %`} />
                                            <KeyValueConfirm keyName="Spot GPU" value={`${form.getValues().spotBidPercentage.spotGPU} %`} />
                                        </Card>
                                    </div>

                                </div>
                            ) : (
                                <>
                                    <p className="font-semibold mb-4">Deploy progress</p>
                                    <Card className="p-4">
                                        {progressList}
                                    </Card>
                                </>
                            )
                        }
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="secondary"
                            size='sm'
                            // onClick={() => setOpenDialog(false)}
                            onClick={() => {
                                if (!isLoading) {
                                    setOpenDialog(false);
                                }
                            }}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button size='sm'
                            onClick={() => onSubmit(form.getValues())}
                            type="submit"
                            className={isLoading ? 'gap-2 flex' : ''}
                            disabled={isLoading || !form.getValues().stackName || !form.getValues().region || hasErrors}
                        >
                            {isLoading && <SpinnerButton />}
                            {isLoading ? 'Deploying' : 'Deploy Farm'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ConfirmDeployDialog