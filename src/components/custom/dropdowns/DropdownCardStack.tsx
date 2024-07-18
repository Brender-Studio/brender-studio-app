import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuItemDestructive, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, MousePointer2, Terminal, Trash } from "lucide-react"
import { open } from "@tauri-apps/api/shell"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import SpinnerButton from "../spinners/SpinnerButton"
import { useQueryClient } from "@tanstack/react-query"
import { destroyStackSequence } from "@/features/stacks/stack-detail/destroyStackSequence"
import { useUserSessionStore } from "@/store/useSessionStore"
import { codeBuildQueries, stackQueries } from "@/react-query-utils/query-key-store/queryKeyStore"
import { toast } from "@/components/ui/use-toast"

interface DropdownCardStackProps {
    awsLinkConsole: string
    stackName: string
    stackStatus: string
}

const DropdownCardStack = ({ awsLinkConsole, stackName, stackStatus }: DropdownCardStackProps) => {
    const [inputValue, setInputValue] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    const { getSessionData, setSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentAwsRegion, currentProfile, currentStack } = sessionData;

    const queryClient = useQueryClient()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }


    const openAWSConsole = (awsLinkConsole: string) => {
        open(awsLinkConsole)
    }

    const handleDeleteStack = async () => {

        try {
            setIsLoading(true)

            await destroyStackSequence({ stackName, region: currentAwsRegion, profile: currentProfile! });
            // console.log('Stack deleted:', res)

            await queryClient.refetchQueries({
                queryKey: stackQueries.stacksQueryKey(currentAwsRegion, currentProfile!),
            })

            await queryClient.resetQueries({
                queryKey: codeBuildQueries.codeBuildProjectsQueryKey(currentProfile!, currentAwsRegion),
            })
            await queryClient.resetQueries({
                queryKey: codeBuildQueries.codeBuildStatusQueryKey(currentProfile!, currentAwsRegion),
            })

            // compare stackName with currentStack and remove it from the local storage
            if (stackName === currentStack) {
                setSessionData({
                    ...sessionData,
                    currentStack: null
                })

            }

        } catch (error) {
            console.error(error)
            setIsLoading(false)
        } finally {
            setInputValue('')
            setOpenDialog(false)
            setIsLoading(false)
        }
    }

    const handleStackChange = (value: string) => {
        // console.log('value', value)
        const selectedStack = value;
        // setCurrentStack(selectedStack);

        setSessionData({
            ...sessionData,
            currentStack: selectedStack
        })

        toast({
            title: 'Stack Changed',
            description: `Current stack is now set to ${selectedStack}`,
            variant: 'success',
            duration: 2000,
        })
    }

    return (
        <Dialog
            open={openDialog}
            onOpenChange={setOpenDialog}
        >
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="link" size="iconCard" className="hover:bg-white/10 rounded-full">
                        <MoreVertical size={16} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44" align="start">
                    <DropdownMenuItem className="text-xs" onClick={() => handleStackChange(stackName)} disabled={stackName === currentStack || stackStatus !== 'CREATE_COMPLETE'}>
                        <MousePointer2 size={16} className="mr-2" />
                        Set as Current Stack
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs" onClick={() => openAWSConsole(awsLinkConsole)}>
                        <Terminal size={16} className="mr-2" />
                        Open in AWS Console
                    </DropdownMenuItem>
                    <DropdownMenuItemDestructive asChild className="text-xs bg-destructive/30 w-full">
                        <DialogTrigger
                            disabled={stackStatus !== 'CREATE_COMPLETE' && stackStatus !== 'ROLLBACK_COMPLETE' && stackStatus !== 'ROLLBACK_FAILED'}
                        >
                            <Trash size={16} className="mr-2" />
                            Delete Stack
                        </DialogTrigger>
                    </DropdownMenuItemDestructive>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogPortal>
                <DialogContent className="DialogContent">
                    <DialogHeader>
                        <DialogTitle>Delete {stackName}</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this stack? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="pb-4">
                        <small className="text-muted-foreground">
                            Type <span className="font-semibold italic">DELETE</span> to confirm.
                        </small>
                        <Input
                            value={inputValue}
                            onChange={handleInputChange}
                            className="italic mt-1" placeholder="DELETE" />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <DialogClose asChild>
                            <Button variant='outline'>Cancel</Button>
                        </DialogClose>
                        <Button
                            variant='destructive'
                            className={isLoading ? 'gap-2 flex' : ''}
                            disabled={inputValue !== "DELETE" || isLoading}
                            onClick={handleDeleteStack}
                        >
                            {isLoading && <SpinnerButton />}
                            {isLoading ? "Deleting" : "Delete"}
                        </Button>
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}

export default DropdownCardStack