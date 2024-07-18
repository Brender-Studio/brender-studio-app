import { Command } from "@tauri-apps/api/shell";

// upload folder to s3
// use sync command instead of cp

export async function uploadFolder({ bucketName, objectKey, folderPath, currentProfile }:
    { bucketName: string, objectKey: string, folderPath: string, currentProfile: string }
) {

    console.log('Uploading folder:', folderPath)

    // extract last folder name from folder path for linux,windows and mac
    const folderName = folderPath.split(/(\\|\/)/g).pop();
    // console.log('folderName:', folderName);

    const command = new Command('aws-cli', [
        's3',
        'sync',
        folderPath,
        `s3://${bucketName}/${objectKey}/${folderName}/`,
        '--profile',
        currentProfile
    ]);

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