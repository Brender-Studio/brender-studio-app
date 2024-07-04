import { fs } from '@tauri-apps/api'

export async function deleteCompressedFolder(compressedFolderPath: string) {
    console.log('Deleting compressed folder:', compressedFolderPath)

    try {
        await fs.removeFile(compressedFolderPath)
    } catch (error) {
        console.error('Error:', error)
    }
}
