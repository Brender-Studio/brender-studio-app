import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogPortal, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuItemDestructive, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DeleteObjectDialog from "@/features/render-contents/bucket-contents/components/DeleteObjectDialog";
import DownloadObjectDialog from "@/features/render-contents/bucket-contents/components/DownloadObjectDialog";
import PresignedUrlDialog from "@/features/render-contents/bucket-contents/components/PresignedUrlDialog";
import { useUserSessionStore } from "@/store/useSessionStore";
import { open } from "@tauri-apps/api/shell";
import { Download, Link2, MoreVertical, Terminal, Trash } from "lucide-react";
import { useState, useCallback } from "react";


interface DropdownCardObjectProps {
    isFolderItem: boolean;
    objectKey: string;
    bucketName: string;
    currentPathname: string;
}

const Dialogs = {
    deleteDialog: 'deleteDialog',
    syncDialog: 'syncDialog',
    presignedUrlDialog: 'presignedUrlDialog',
};

const DropdownCardObject = ({ isFolderItem, objectKey, bucketName, currentPathname }: DropdownCardObjectProps) => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion, currentProfile } = getSessionData();

    const [dialog, setDialog] = useState('');

    const [state, setState] = useState({
        isLoading: false,
        openDialog: false,
    });

    const splitPathname = currentPathname.split('/');
    const objectPath = isFolderItem ? `${objectKey}/` : objectKey;

    const buildAWSConsoleLink = useCallback(() => {
        console.log('objectPath:', objectPath);
        console.log('splitPathname:', splitPathname);
        let pathPrefix = isFolderItem ? 'buckets' : 'object';
        let pathSuffix = currentPathname === '/renders' ? '' : '/' + splitPathname.slice(2).join('/');
        pathSuffix = pathSuffix.startsWith('/') ? pathSuffix.substring(1) : pathSuffix;

        // Verify if the pathSuffix is empty or just "/" to avoid adding an extra "/" in the URL
        if (pathSuffix === '' || pathSuffix === '/') {
            console.log('pathSuffix is empty or just "/"');
            return `https://${currentAwsRegion}.console.aws.amazon.com/s3/${pathPrefix}/${bucketName}?region=${currentAwsRegion}&bucketType=general&prefix=${objectPath}`;
        } else {
            console.log('pathSuffix:', pathSuffix);
            return `https://${currentAwsRegion}.console.aws.amazon.com/s3/${pathPrefix}/${bucketName}?region=${currentAwsRegion}&bucketType=general&prefix=${pathSuffix}/${objectPath}`;
        }
    }, [currentPathname, splitPathname, bucketName, objectPath, isFolderItem, currentAwsRegion]);


    const openAWSConsole = useCallback((e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        const link = buildAWSConsoleLink();
        console.log('awsLinkConsole:', link);
        open(link);
    }, [buildAWSConsoleLink]);



    return (
        <Dialog
            open={state.openDialog}
            onOpenChange={(isOpen) => {
                setState((prevState) => ({ ...prevState, openDialog: isOpen }));
                if (!isOpen) {
                    setState((prevState) => ({ ...prevState, inputValue: '' }));
                }
            }}
        >
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="link" size="iconCard" className="hover:bg-white/10 rounded-full">
                        <MoreVertical size={16} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem className="text-xs" onClick={(e) => openAWSConsole(e)}>
                        <Terminal size={16} className="mr-2" />
                        Open in AWS Console
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="text-xs w-full"
                        onClick={() => { setDialog(Dialogs.deleteDialog) }}>
                        <DialogTrigger>
                            <Download size={16} className="mr-2" />
                            Download {isFolderItem ? "Folder" : "File"}
                        </DialogTrigger>
                    </DropdownMenuItem>
                    {
                        !isFolderItem && (
                            <DropdownMenuItem asChild className="text-xs w-full"
                                onClick={() => { setDialog(Dialogs.presignedUrlDialog) }}>
                                <DialogTrigger>
                                    <Link2 size={16} className="mr-2" />
                                    Temporary URL
                                </DialogTrigger>
                            </DropdownMenuItem>
                        )
                    }
                    <DropdownMenuItemDestructive
                        asChild className="text-xs bg-destructive/60 w-full"
                        onClick={() => { setDialog(Dialogs.syncDialog) }}
                    >
                        <DialogTrigger>
                            <Trash size={16} className="mr-2" />
                            Delete {isFolderItem ? "Folder" : "File"}
                        </DialogTrigger>
                    </DropdownMenuItemDestructive>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogPortal>
                <DialogContent >
                    {dialog === Dialogs.deleteDialog && (
                        <DownloadObjectDialog
                            objectKey={objectKey}
                            isFolderItem={isFolderItem}
                            currentPathname={currentPathname}
                            bucketName={bucketName}
                            splitPathname={splitPathname}
                            state={state}
                            setState={setState}
                        />
                    )}
                    {dialog === Dialogs.syncDialog &&
                        (
                            <DeleteObjectDialog
                                objectKey={objectKey}
                                isFolderItem={isFolderItem}
                                currentPathname={currentPathname}
                                bucketName={bucketName}
                                splitPathname={splitPathname}
                                state={state}
                                setState={setState}
                            />
                        )}
                    {
                        dialog === Dialogs.presignedUrlDialog && (
                            <PresignedUrlDialog
                                objectKey={objectKey}
                                currentPathname={currentPathname}
                                bucketName={bucketName}
                                state={state}
                                currentProfile={currentProfile!}
                                currentAwsRegion={currentAwsRegion}
                            />
                        )
                    }
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default DropdownCardObject;
