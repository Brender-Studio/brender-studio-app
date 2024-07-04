import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SpinnerButton from "@/components/custom/spinners/SpinnerButton";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { emptyBucket } from "@/cli-functions/s3-data/emptyBucket";
import { toast } from "@/components/ui/use-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { s3Queries } from "@/react-query-utils/query-key-store/queryKeyStore";

interface EmptyBucketDialogProps {
  bucketName: string;
  currentAwsRegion: string;
  currentProfile: string;
  currentStack: string;
}

const EmptyBucketDialog = ({ bucketName, currentAwsRegion, currentProfile, currentStack }: EmptyBucketDialogProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const currentPathname = useLocation().pathname;

  const emptyBucketMutation = useMutation({
    mutationFn: async () => {
      setIsLoading(true)
      const res = await emptyBucket({ bucket: bucketName, region: currentAwsRegion, profile: currentProfile })
      return { res }
    },
    onSuccess: () => {
      // HERE invalidates the query to refetch the data
      queryClient.refetchQueries({
        queryKey: s3Queries.s3BucketContentsQueryKey(currentStack, currentAwsRegion, currentProfile, currentPathname === '/renders' ? '' : currentPathname.replace('/renders/', ''))
      })
      navigate('/renders')
      toast({
        title: 'Bucket emptied successfully',
        description: `The bucket ${bucketName} has been emptied.`,
        variant: 'success'
      })
      setIsLoading(false)
      setOpenDialog(false)
      setInputValue('')
    },
    onError: () => {
      setIsLoading(false)
      setOpenDialog(false)
      toast({
        title: 'Error emptying bucket',
        description: `There was an error emptying the bucket ${bucketName}.`,
        variant: 'destructive'
      })
      setInputValue('')
    }

  })

  const handleEmptyBucket = () => {
    emptyBucketMutation.mutate()
  }


  return (

    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant='destructive' size='sm' disabled={!bucketName}>Empty Bucket</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Empty Bucket
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to empty the bucket <span className="font-semibold">{bucketName}</span>?
          </DialogDescription>
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
            className={isLoading ? 'gap-2 flex' : ''}
            disabled={isLoading || inputValue !== 'EMPTY'}
            onClick={handleEmptyBucket}
          >
            {isLoading && <SpinnerButton />}
            {isLoading ? "Emptying" : "Empty"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EmptyBucketDialog