import { resolveResource } from "@tauri-apps/api/path";
import { getDataBlenderScene } from "@/cli-functions/blender/getDataBlenderScene";
import { modifyAllScenes } from "./modifyAllScenes";
import { getCurrentSceneFromAllScenes } from "./getCurrentSceneFromAllScenes";
import {  Scene } from "../ProjectSettings.types";

interface BlenderData {
    setIsDataLoading: (value: boolean) => void;
    setAllScenes: (scenes: Scene[]) => void;
    blenderExecPath: string;
    selectedPaths: { filePath: string };
    setCurrentScene: (scene: Scene[]) => void;
    setErrorBlenderData: (value: string) => void;
}

export const getBlenderData = async (
    { setIsDataLoading, setAllScenes, blenderExecPath, selectedPaths, setCurrentScene, setErrorBlenderData }: BlenderData
) => {
    try {
        setIsDataLoading(true);
        const scriptPath = await resolveResource("resources/scripts/get_data_scene.py");

        const data = await getDataBlenderScene(blenderExecPath, selectedPaths.filePath, scriptPath);
        // console.log('data scene', data);

        if (!data) {
            setErrorBlenderData("Error retrieving data from Blender. Please check the Blender executable path and the selected file.");
            return;
        }

        // modify all scenes, if scene does not have eeevee_config object, add it, if it does not have cycles_config object, add it with default values
        const modifiedData = modifyAllScenes(data);
        console.log('modifiedData', modifiedData);

        setAllScenes(modifiedData);
        const scene = await getCurrentSceneFromAllScenes(modifiedData, setCurrentScene);
        console.log('scene', scene);
        return modifiedData;
    } catch (error) {
        console.error('Error in getBlenderData:', error);
        throw error;
    } finally {
        setIsDataLoading(false);
    }
};
