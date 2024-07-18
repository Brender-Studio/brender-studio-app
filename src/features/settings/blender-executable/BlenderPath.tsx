import AddPathButton from "./add-path/AddPathButton"
import {  useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AddPathMacos from "./add-path/AddPathMacos";
import usePlatform from "@/hooks/usePlatform";


const BlenderPath = () => {
    const localStoragePath = localStorage.getItem('blenderExecutablePath');
    const [selectedPath, setSelectedPath] = useState(localStoragePath);
    const currentPlatform = usePlatform();

    // console.log('Current platform: ', currentPlatform)


    return (
        <div id="blenderExecutablePath">
            <Card>
                <CardHeader>
                    <div className="flex items-center w-full justify-between gap-4">
                        <div>
                            <CardTitle className="text-md">Blender Executable Path</CardTitle>
                            <CardDescription className="text-xs">The path to the Blender executable that will be used to get scene information. Use the latest version of Blender for better compatibility.</CardDescription>
                        </div>
                        {
                            currentPlatform === 'Macintosh' ? <AddPathMacos setSelectedPath={setSelectedPath} selectedPath={selectedPath} /> : <AddPathButton setSelectedPath={setSelectedPath} selectedPath={selectedPath} />
                        }
                    </div>
                </CardHeader>
                <CardContent>
                    <ul className="text-muted-foreground">
                        <li className="text-sm">
                            {
                                selectedPath ?
                                    <Badge variant='secondary'>
                                        {selectedPath}
                                    </Badge> : 'No Blender path set yet.'
                            }
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}

export default BlenderPath