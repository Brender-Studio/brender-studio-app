import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { FileDropEvent } from "@/features/render/project-settings/ProjectSettings.types"
import { useFiledropHover } from "@/hooks/useFiledropHover"
import { listen } from "@tauri-apps/api/event"

import { FolderSearch, Pencil } from "lucide-react"
import { useEffect, useState } from "react"

interface AddPathMacosProps {
    setSelectedPath: (path: string | null) => void;
    selectedPath: string | null;
}

const AddPathMacos = ({ selectedPath, setSelectedPath }: AddPathMacosProps) => {
    const [openDialog, setOpenDialog] = useState(false)
    const { isHovering } = useFiledropHover()
    const localStoragePath = localStorage.getItem('blenderExecutablePath');


    useEffect(() => {
        const fileDropListener = async (event: FileDropEvent) => {
            try {
                // console.log('Event: ', event)
                const path = event.payload[0]
                // console.log('Path: ', path)
                setSelectedPath(path);
            } catch (error) {
                console.error(error)
                throw new Error('Error while setting the path.')
            }

        }

        const dropListener = listen('tauri://file-drop', fileDropListener)

        return () => {
            dropListener.then(unsubscribe => unsubscribe());
        };
    }, [])


    const addPath = () => {
        // Set the selected path to local storage for persistence
        localStorage.setItem('blenderExecutablePath', selectedPath as string);
        setOpenDialog(false)
        toast({
            title: 'Path selected',
            variant: 'success',
            description: 'The Blender path has been set successfully.',
            duration: 2000,
        });
    }


    return (
        <Dialog
            onOpenChange={
                (isOpen) => { setOpenDialog(isOpen) 
                    if(selectedPath && !localStoragePath) {
                        setSelectedPath(null)
                    }
                 }
            }
            open={openDialog}
        >
            <DialogTrigger asChild>
                <Button size='sm' className="flex items-center">
                    {localStoragePath ? <Pencil size={16} className='mr-2' /> : <FolderSearch size={16} className='mr-2' />}
                    {localStoragePath ? 'Change Path' : 'Add Path'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add Blender Executable Path (MacOS)
                    </DialogTitle>
                    <DialogDescription>
                        <span className="text-xs">
                            Example: Applications/Blender.app/Contents/MacOS/Blender
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <Card className={`relative flex justify-center items-center p-4 h-36 border-dashed border-2 ${isHovering ? 'bg-accent ' : 'cursor-pointer'}`}>
                    <p className='text-center text-muted-foreground text-xs'>
                        {selectedPath ? selectedPath : 'Drag and drop the Blender executable here.'}
                    </p>
                </Card>

                <DialogFooter className='pt-4'>
                    <Button
                        size='sm'
                        type="submit"
                        disabled={!selectedPath}
                        onClick={addPath}
                    >
                        Add Path
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddPathMacos