import { invoke } from "@tauri-apps/api/tauri";

export async function getFileSize(path: string): Promise<number> {
    return await invoke("get_file_size", { path });
}

export async function getFolderSize(path: string): Promise<number> {
    return await invoke("get_folder_size", { path });
}