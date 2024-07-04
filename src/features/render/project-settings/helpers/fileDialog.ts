import { open } from "@tauri-apps/api/dialog";

export const openFolderDialog = async () => {
    return await open({
        directory: true,
        multiple: false,
        title: "Select a folder",
    });
};

export const openFileDialog = async () => {
    return await open({
        directory: false,
        multiple: false,
        title: "Select a Blender file",
        filters: [{
            name: "Blender Files",
            extensions: ["blend"],
        }]
    });
};
