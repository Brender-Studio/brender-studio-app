import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import ListJobStatus from "./ListJobStatus"
import { CheckCircle2Icon } from "lucide-react"

interface JobStatusDialogProps {
    jobQueueName: string
    jobStatus: string
    totalJobNumber: number
    title: string
    description: string
    openDialog: boolean
    setOpenDialog: (value: boolean) => void
}

const JobStatusDialog = ({
    title,
    description,
    openDialog,
    setOpenDialog,
    totalJobNumber,
    jobQueueName,
    jobStatus
}: JobStatusDialogProps) => {

    return (
        <div className="flex justify-center">
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                    {(description !== "SUCCEEDED" && description !== "FAILED") ?
                        <Button variant="ghost" size='icon' className="mx-auto">
                            {totalJobNumber}
                        </Button>
                        :
                        <Button variant="ghost" size='iconLarge' >
                            <div className={`flex items-center text-${description === "SUCCEEDED" ? "green" : "red"}-500 font-semibold justify-center`}>
                                <CheckCircle2Icon size={16} className="mr-2" />
                                <span className="font-semibold">
                                    {totalJobNumber}
                                </span>
                            </div>
                        </Button>
                    }
                </DialogTrigger>
                <DialogContent className="max-w-[1000px]">
                    <DialogHeader>
                        <DialogTitle>
                            {title}
                        </DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                        <div className="py-4 max-h-[70vh] overflow-y-scroll pr-2">
                            <ListJobStatus
                                jobQueueName={jobQueueName}
                                jobStatus={jobStatus}
                            />
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default JobStatusDialog