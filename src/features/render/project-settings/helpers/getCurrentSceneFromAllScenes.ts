import { Scene } from "../ProjectSettings.types";

export const getCurrentSceneFromAllScenes = async (data: Scene[], setCurrentScene: (scene: Scene[]) => void): Promise<Scene[]> => {
    const scene = data.filter((scene: Scene) => scene.is_active === true);
    setCurrentScene(scene);
    return scene;
};