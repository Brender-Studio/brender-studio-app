import { Command } from "@tauri-apps/api/shell";


export async function uploadObject({ bucketName, objectPath, filePath, currentProfile }:
    { bucketName: string, objectPath: string, filePath: string, currentProfile: string }
) {

    // console.log('Uploading object:', objectPath)

    const command = new Command('aws-cli', ['s3', 'cp', filePath, `s3://${bucketName}/${objectPath}/`, '--profile', currentProfile]);

    // console.log('command:', command);

    try {
        const result = await command.execute();
        // console.log('result:', result);
        const resultString = result.stdout.toString();
        // console.log('resultString:', resultString);
        return resultString;
    } catch (error) {
        console.error(error);
        throw new Error(`Command failed with error: ${error}`);
    }
}