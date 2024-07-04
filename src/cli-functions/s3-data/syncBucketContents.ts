import { Command } from "@tauri-apps/api/shell";


export async function syncBucketContents(localPath: string, bucketName: string, profile: string, isFolder: boolean, updateLogCallback: (log: string) => void) {

    try {
        let syncCommand = ''

        if (isFolder) {
            syncCommand = 'sync'
        } else {
            syncCommand = 'cp'
        }
        const command = new Command('aws-cli', ["s3", syncCommand, `s3://${bucketName}`, localPath, "--profile", profile]);

        console.log('command', command);
        let errorOutput = '';

        command.stderr.on('data', data => {
            errorOutput += data.toString();
        });

        command.stdout.on('data', data => {
            const message = data.toString();
            console.log('Files Downloaded:', message);
            updateLogCallback(message);
        });

        const child = await command.execute();

        if (child.code !== 0) {
            throw new Error(`Command failed with code ${child.code}. Error: ${errorOutput}`);
        }
        // console.log('child', child);

        const str = child.stdout.toString();


        return str;

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }
}