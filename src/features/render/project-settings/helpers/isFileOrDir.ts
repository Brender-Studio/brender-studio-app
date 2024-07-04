import { fs } from '@tauri-apps/api'


export async function isFileOrDirectory(path: string) {
    try {
        await fs.readBinaryFile(path)
        return { filename: path.split(/[\\/]+/).pop(), path: path, type: 'file' }
    } catch (e) {
        try {
            await fs.readDir(path)
            return { filename: path.split(/[\\/]+/).pop(), path: path, type: 'directory' }
        } catch (e) {
            return { filename: path.split(/[\\/]+/).pop(), path: path, type: 'unknown' }
        }
    }
}