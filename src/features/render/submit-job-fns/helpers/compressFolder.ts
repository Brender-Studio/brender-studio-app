import { join } from '@tauri-apps/api/path';
import { invoke } from '@tauri-apps/api/tauri'

export async function compressFolder(folderPath: string) {

    // console.log('Compressing folder:', folderPath)

    try {
        const outputPath = await join(folderPath + '.tar.gz');

        // console.log('outputPath', outputPath)

        await compressDirectory(folderPath, outputPath)

        return outputPath;
    
    } catch (error) {
        console.error('Error:', error)
    }


}

async function compressDirectory(source_directory: string, output_path: string) {
    // console.log('source_directory', source_directory)
    // console.log('output_path', output_path)
    await invoke('compress_directory', { sourceDirectory: source_directory, outputPath: output_path });
}