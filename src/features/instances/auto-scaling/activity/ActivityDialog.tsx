import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import ListActivityLogs from "./activity-table/ListActivityLogs"

interface ActivityDialogProps {
  title: string
  description: string
  autoScalingGroupName: string
  openDialog: boolean
  setOpenDialog: (value: boolean) => void
}

const ActivityDialog = ({ title, description, autoScalingGroupName, openDialog, setOpenDialog }: ActivityDialogProps) => {
  // console.log('autoScalingGroupName', autoScalingGroupName)

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" size='sm' className="w-full">
            View Logs
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[1000px]">
          <DialogHeader>
            <DialogTitle>
              {title}
            </DialogTitle>
            <DialogDescription>
              {description} {autoScalingGroupName}
            </DialogDescription>
            <div className="py-4 max-h-[70vh] overflow-y-scroll pr-2">
              <ListActivityLogs
                autoscalingGroupName={autoScalingGroupName}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ActivityDialog