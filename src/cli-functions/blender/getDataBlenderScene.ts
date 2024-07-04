import { invoke } from "@tauri-apps/api/tauri";


async function runBlenderCommand(blenderExe: string, blendFilePath: string, scriptPath: string): Promise<string> {
    return await invoke<string>('run_blender_command', {
        blenderPath: blenderExe,
        blendFilePath: blendFilePath,
        scriptPath: scriptPath,
    });
}

async function parseBlenderResult(result: string) {
    const START_MARKER = '##START##';
    const END_MARKER = '##END##';
    const startIndex = result.indexOf(START_MARKER);
    const endIndex = result.indexOf(END_MARKER);

    if (startIndex !== -1 && endIndex !== -1) {
        const jsonDataString = result.substring(startIndex + START_MARKER.length, endIndex).trim();
        try {
            const jsonData = JSON.parse(jsonDataString);
            return jsonData;
        } catch (error) {
            if (error instanceof Error) {
                return error.message;
            }
        }
    } else {
        console.error('Cannot find start or end markers in the result');
        return '';
    }
}


export async function getDataBlenderScene(blenderExe: string, blendFilePath: string, scriptPath: string){
    try {
        const result = await runBlenderCommand(blenderExe, blendFilePath, scriptPath);
        return parseBlenderResult(result);
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        }
    }
}