import { BaseDirectory, readDir } from '@tauri-apps/api/fs';

export const readDirectory = async (directoryPath: string) => {
    return await readDir(directoryPath, {
        dir: BaseDirectory.App,
        recursive: true
    });
};


