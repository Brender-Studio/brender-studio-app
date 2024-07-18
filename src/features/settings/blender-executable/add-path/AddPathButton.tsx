import { Button } from '@/components/ui/button'
import { FolderSearch, Pencil } from 'lucide-react'
import { open } from '@tauri-apps/api/dialog'
import { toast } from '@/components/ui/use-toast';

interface AddPathButtonProps {
    setSelectedPath: (path: string | null) => void;
    selectedPath: string | null;
}

const AddPathButton = ({ setSelectedPath, selectedPath }: AddPathButtonProps) => {


    const openDialog = async () => {
        const selected = await open({
            directory: false,
            multiple: false,
        });

        if (selected === null) {
            console.log('No path selected');
        } else {
            // console.log(selected);
            setSelectedPath(selected as string);
            // Set the selected path to local storage for persistence
            localStorage.setItem('blenderExecutablePath', selected as string);

            toast({
                title: 'Path selected',
                variant: 'success',
                description: 'The Blender path has been set successfully.',
                duration: 2000,
            });
        }
    }

    return (
        <Button size='sm' onClick={openDialog} className="flex items-center">
            {selectedPath ? <Pencil size={16} className='mr-2' /> : <FolderSearch size={16} className='mr-2' /> }
            {selectedPath ? 'Change Path' : 'Add Path'}
        </Button>
    )
}

export default AddPathButton