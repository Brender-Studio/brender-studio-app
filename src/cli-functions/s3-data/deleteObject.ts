import { Command } from "@tauri-apps/api/shell";

export async function deleteObject({ bucketName, objectPath, isFolderItem, currentProfile }:
    { bucketName: string, objectPath: string, isFolderItem: boolean, currentProfile: string }
) {

    let command: Command | null = null;

    if (isFolderItem) {
        console.log('Deleting folder:', objectPath)
        command = new Command('aws-cli', ['s3', 'rm', `s3://${bucketName}/${objectPath}/`, '--recursive', '--profile', currentProfile]);
    } else {
        console.log('Deleting object:', objectPath)
        command = new Command('aws-cli', ['s3', 'rm', `s3://${bucketName}/${objectPath}`, '--profile', currentProfile]);
    }

    console.log('command:', command);

    if (command) {
        try {
            const result = await command.execute();
            console.log('result:', result);
            const resultString = result.stdout.toString();
            console.log('resultString:', resultString);
            return resultString;
        } catch (error) {
            console.error(error);
            throw new Error(`Command failed with error: ${error}`);
        }
    } else {
        console.error("Command is null.");
        return null;
    }
}