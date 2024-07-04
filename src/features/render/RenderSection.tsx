import RenderTabs from './RenderTabs'
import AddPathButton from '../settings/blender-executable/add-path/AddPathButton'
import { useState } from 'react'
import { useUserSessionStore } from '@/store/useSessionStore'
import NoStackSelected from '@/components/custom/no-data/NoStackSelected'
import usePlatform from '@/hooks/usePlatform'
import AddPathMacos from '../settings/blender-executable/add-path/AddPathMacos'

interface RenderFrameFormProps {
    formFrame: JSX.Element,
    formAnimation: JSX.Element,
    formPython: JSX.Element
}

const RenderSection = ({ formFrame, formAnimation, formPython }: RenderFrameFormProps) => {
    const { getSessionData } = useUserSessionStore();
    const { currentStack } = getSessionData();

    const blenderPath = localStorage.getItem('blenderExecutablePath');
    const [selectedPath, setSelectedPath] = useState(blenderPath);
    const currentPlatform = usePlatform();


    return (
        <div>
            {
                blenderPath ? (
                    currentStack ? (
                        <div>
                            <RenderTabs
                                formFrame={formFrame}
                                formAnimation={formAnimation}
                                formPython={formPython}
                            />
                        </div>
                    ) : (
                        <NoStackSelected />
                    )
                ) : (
                    <div className="w-full flex justify-center items-center h-[80vh]">
                        <div className='flex flex-col gap-2 justify-center items-center'>
                            {
                                currentPlatform === 'Macintosh' ? <AddPathMacos setSelectedPath={setSelectedPath} selectedPath={selectedPath} /> : <AddPathButton setSelectedPath={setSelectedPath} selectedPath={selectedPath} />
                            }
                            <p className="text-sm text-muted-foreground">
                                No Blender executable path set yet. Please set the path to your Blender executable.
                            </p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default RenderSection