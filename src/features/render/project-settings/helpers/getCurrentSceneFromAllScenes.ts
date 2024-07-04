export const getCurrentSceneFromAllScenes = async (data: any, setCurrentScene: any) => {
    const scene = await data?.filter((scene: any) => scene.is_active === true)
    setCurrentScene(scene)
    return scene
}