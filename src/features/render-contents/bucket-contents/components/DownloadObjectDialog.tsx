import SpinnerButton from "@/components/custom/spinners/SpinnerButton"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FolderSearch } from "lucide-react";
import { useState } from "react";
import { open } from "@tauri-apps/api/dialog";
import { syncBucketContents } from "@/cli-functions/s3-data/syncBucketContents";
import { toast } from "@/components/ui/use-toast";
import { useUserSessionStore } from "@/store/useSessionStore";


interface DownloadObjectDialogProps {
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

const DownloadObjectDialog = ({ objectKey, isFolderItem, setState, currentPathname, bucketName }: DownloadObjectDialogProps) => {
    const [selectedPath, setSelectedPath] = useState<string | null>(null);
    const [responseLog, setResponseLog] = useState<React.ReactNode[] | string>();
    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentProfile } = sessionData;

    const [loading, setLoading] = useState(false);

    const openDialog = async () => {
        const selected = await open({
            directory: true,
            multiple: false,
        });

        if (selected === null) {
            setSelectedPath(null);
            setResponseLog("")
        } else {
            setSelectedPath(selected as string);
        }
    }

    const handleSync = async () => {
        setLoading(true);

        try {
            // in /renders : "s3://brender-bucket-s3-xxx//bucket-box-imgs", duplicated slashes (issue with the bucket path)
            const bucketPath = currentPathname.split('/').slice(2).join('/');
            const fullPath = currentPathname === '/renders' ? bucketName + bucketPath + '/' + objectKey : bucketName + '/' + bucketPath + '/' + objectKey;
            console.log('fullPath:', fullPath);
            
            // This is the path where the file will be downloaded (selectedPath + objectKey): /home/username/Downloads/folder-name or /home/username/Downloads/file-name
            const folderLocalPath = selectedPath + '/' + objectKey;

            const response = await syncBucketContents(folderLocalPath!, fullPath, currentProfile!, isFolderItem,
                (log: string) => {
                    setResponseLog(prevLog =>
                        [log, ...(prevLog || [])]
                    )
                }
            );
            if (response && response?.length > 0) {
                toast({
                    title: 'Success',
                    description: 'Files downloaded successfully',
                    variant: 'success',
                    duration: 2000,
                });
                const responseMessages = response.split('\n').map((message, index) => (
                    <p key={index} className="text-xs text-muted-foreground font-normal">
                        {message}
                    </p>
                ));
                setResponseLog(responseMessages);
            } else {
                setResponseLog("No files downloaded.");
            }
        } catch (error) {
            if (error instanceof Error) {
                toast({
                    title: 'Error',
                    description: error.message,
                    variant: 'destructive',
                    className: 'text-xs',
                });
            }
        } finally {
            setLoading(false);
            setState((prevState) => ({ ...prevState, openDialog: false }));
        }
    }
    

    return (
        <div>
            <DialogHeader>
                <DialogTitle>
                    Download {isFolderItem ? "Folder" : "File"} - {objectKey}
                </DialogTitle>
                <DialogDescription>
                    {isFolderItem ? "Download folder and its contents" : "Download file"}, choose a location to save the file.
                </DialogDescription>
            </DialogHeader>
            <div className="w-full py-4">
                <Button variant='outline' className="w-full" onClick={openDialog}>
                    <FolderSearch size={18} className="mr-2" />
                    Choose Location
                </Button>
                {
                    selectedPath && (
                        <div className="text-xs font-semibold text-muted-foreground py-2">
                            Selected Path: <span className="font-normal">{selectedPath}</span>
                        </div>
                    )
                }
                {responseLog &&
                    <div className="w-full max-h-[300px] py-6 z-[800] overflow-y-scroll mt-4">
                        <div className="space-y-2">
                            <div className="text-xs text-muted-foreground font-normal">{responseLog}</div>
                        </div>
                    </div>
                }
            </div>
            <DialogFooter className="pt-4">
                <DialogClose asChild>
                    <Button variant='outline'>Cancel</Button>
                </DialogClose>
                <Button
                    variant='default'
                    className={loading ? 'gap-2 flex' : ''}
                    disabled={!selectedPath || loading}
                    onClick={handleSync}
                >
                    {loading && <SpinnerButton />}
                    {loading ? 'Downloading' : 'Download'}
                </Button>
            </DialogFooter>
        </div>
    )
}

export default DownloadObjectDialog