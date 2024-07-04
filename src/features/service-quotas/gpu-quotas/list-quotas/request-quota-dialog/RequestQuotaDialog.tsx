import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useUserSessionStore } from "@/store/useSessionStore"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import SpinnerButton from "@/components/custom/spinners/SpinnerButton"
import { requestIncreaseQuota } from "@/cli-functions/service-quotas/requestIncreaseQuota"

interface RequestQuotaDialogProps {
    openDialog: boolean
    setOpenDialog: (value: boolean) => void
    quotaName: string
    serviceCode: string
    currentQuota: string
    quotaCode: string
}

const RequestQuotaDialog = ({ openDialog,
    setOpenDialog,
    currentQuota,
    quotaName,
    serviceCode,
    quotaCode
}: RequestQuotaDialogProps) => {
    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentAwsRegion, currentProfile } = sessionData;

    const [inputError, setInputError] = useState(false)
    const [inputValue, setInputValue] = useState(currentQuota)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleRequestQuota = async () => {
        console.log('Request Quota')
        try {
            setIsSubmitting(true)
            const res = await requestIncreaseQuota(currentProfile!, currentAwsRegion!, serviceCode, quotaCode, parseInt(inputValue))
            console.log(res)
            setIsSubmitting(false)
            setOpenDialog(false)
            toast({
                title: 'Success',
                description: 'Quota increase requested successfully',
                variant: 'success',
                duration: 2000,
            })
        } catch (error) {
            console.error('Error requesting quota increase', error)
            toast({
                title: 'Error',
                description: `${error}`,
                variant: 'destructive',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInputValue(value)
        if (parseInt(value) > parseInt(currentQuota)) {
            setInputError(false)
        } else {
            setInputError(true)
        }
    }

    return (
        <div>
            <Dialog open={openDialog} 
            // onOpenChange={setOpenDialog}
             onOpenChange={(open) => {
                if (open || (!open && !isSubmitting)) {
                    setOpenDialog(open);
                }
            }}
            >
                <DialogTrigger asChild>
                    <Button variant="outline" size='sm' className="w-full">
                        Request Increase
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[750px]">
                    <DialogHeader>
                        <DialogTitle>
                            Request Quota Increase for {quotaName}
                        </DialogTitle>
                        <DialogDescription className="pt-2">
                            Maximum number of vCPUs assigned to the {serviceCode.toUpperCase()} service in the {quotaName} in {currentAwsRegion} region. The current quota is {currentQuota}.
                        </DialogDescription>
                        <DialogDescription className="pt-2">
                            You will receive a notification in your AWS account email when the quota increase is approved or denied.
                        </DialogDescription>
                        <div className="py-4 px-1 max-h-96 overflow-y-scroll pr-2">
                            <Input
                                placeholder="Enter new quota value"
                                onChange={handleInputChange}
                                defaultValue={currentQuota}
                                min={currentQuota}
                                type="number"
                            />
                            {
                                inputError || inputValue === '' || parseInt(inputValue) <= parseInt(currentQuota)
                                    ? (<Label className="text-xs font-normal text-red-500">
                                        The new quota value must be greater than the current quota value.
                                    </Label>)
                                    : (<Label className="text-xs font-normal">
                                        The new quota value must be greater than the current quota value.
                                    </Label>)
                            }

                        </div>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2">
                        <DialogClose asChild>
                            <Button variant='outline'>Cancel</Button>
                        </DialogClose>
                        <Button
                            onClick={handleRequestQuota}
                            disabled={inputError || isSubmitting || currentQuota === inputValue || inputValue === ''}
                        >
                            {isSubmitting && <SpinnerButton />}
                            {isSubmitting ?
                                <span className="ml-2">
                                    Requesting
                                </span>
                                : 'Request Increase'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default RequestQuotaDialog