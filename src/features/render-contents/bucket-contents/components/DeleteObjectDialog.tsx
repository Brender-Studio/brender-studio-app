import { deleteObject } from "@/cli-functions/s3-data/deleteObject";
import SpinnerButton from "@/components/custom/spinners/SpinnerButton";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQueryClient } from "@tanstack/react-query";

interface DeleteObjectDialogProps {
    isFolderItem: boolean;
    objectKey: string;
    currentPathname: string;
    bucketName: string;
    splitPathname: string[]
    state: {
        isLoading: boolean;
        openDialog: boolean;
    }
    setState: React.Dispatch<React.SetStateAction<{
        isLoading: boolean;
        openDialog: boolean;
    }>>
}

const DeleteObjectDialog = ({ isFolderItem, objectKey, currentPathname, bucketName, splitPathname, state, setState }: DeleteObjectDialogProps) => {
    const queryClient = useQueryClient();

    // const { currentStack, currentAwsRegion, currentProfile } = useUserSessionStore();
    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentProfile, currentAwsRegion , currentStack} = sessionData;

    const s3BucketQueryKey = ['s3-bucket-contents', currentStack, currentAwsRegion, currentProfile, currentPathname === '/renders' ? '' : currentPathname.replace('/renders/', '')];


    const handleDelete = async () => {
        console.log('Deleting:', objectKey);
        try {
            setState((prevState) => ({ ...prevState, isLoading: true }));

            const objectPathToDelete = currentPathname === '/renders' ? objectKey : splitPathname.slice(2).join('/') + '/' + objectKey;

            const res = await deleteObject({ bucketName, objectPath: objectPathToDelete, isFolderItem, currentProfile: currentProfile! });
            console.log('res:', res);

            if (res) {
                // queryClient.refetchQueries({
                //     queryKey: s3BucketQueryKey,
                // });
                queryClient.invalidateQueries({
                    queryKey: s3BucketQueryKey,
                });
                toast({
                    title: `Successfully deleted ${objectKey}`,
                    description: `The ${isFolderItem ? 'folder' : 'file'} was successfully deleted.`,
                    variant: 'success',
                })
            }
        } catch (error) {
            console.error('Error deleting:', error);
            toast({
                title: 'Error deleting',
                description: `There was an error deleting the ${isFolderItem ? 'folder' : 'file'}.`,
                variant: 'destructive',
            })
        } finally {
            setState((prevState) => ({ ...prevState, isLoading: false, openDialog: false }));
        }
    };

    return (
        <div>
            <DialogHeader>
                <DialogTitle>
                    Delete <span className="font-semibold italic"> {objectKey}</span>
                </DialogTitle>
                <DialogDescription>
                    Are you sure you want to delete this {isFolderItem ? "folder" : "file"}?
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className="pt-4">
                <DialogClose asChild>
                    <Button variant='outline'>Cancel</Button>
                </DialogClose>
                <Button
                    variant='destructive'
                    className={state.isLoading ? 'gap-2 flex' : ''}
                    onClick={handleDelete}
                    disabled={state.isLoading}
                >
                    {state.isLoading && <SpinnerButton />}
                    {state.isLoading ? "Deleting" : "Delete"}
                </Button>
            </DialogFooter>
        </div>

    )
}

export default DeleteObjectDialog