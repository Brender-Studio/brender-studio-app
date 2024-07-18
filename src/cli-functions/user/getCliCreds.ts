import { Command } from "@tauri-apps/api/shell";

export async function getCliCreds(profile: string) {
    console.log(`Getting CLI creds for profile ${profile}...`);
    
    try {
        // Get the aws_access_key_id 
        const accessKeyIdCommand = new Command('aws-cli', ["configure", "get", "aws_access_key_id", "--profile", profile]);
        const accessKeyIdOutput = await accessKeyIdCommand.execute();
        const accessKeyIdStderr = accessKeyIdOutput.stderr?.toString() || '';

        if (accessKeyIdOutput.code !== 0) {
            console.error(`Failed to get aws_access_key_id with code ${accessKeyIdOutput.code}`);
            console.error(`stderr: ${accessKeyIdStderr}`);
            throw new Error(accessKeyIdStderr);
        }

        const accessKeyId = accessKeyIdOutput.stdout?.toString().trim() || '';

        // Get the aws_secret_access_key
        const secretAccessKeyCommand = new Command('aws-cli', ["configure", "get", "aws_secret_access_key", "--profile", profile]);
        const secretAccessKeyOutput = await secretAccessKeyCommand.execute();
        const secretAccessKeyStderr = secretAccessKeyOutput.stderr?.toString() || '';

        if (secretAccessKeyOutput.code !== 0) {
            console.error(`Failed to get aws_secret_access_key with code ${secretAccessKeyOutput.code}`);
            console.error(`stderr: ${secretAccessKeyStderr}`);
            throw new Error(secretAccessKeyStderr);
        }

        const secretAccessKey = secretAccessKeyOutput.stdout?.toString().trim() || '';

        // Retun aws_access_key_id and aws_secret_access_key
        return { awsAccessKeyId: accessKeyId, awsSecretAccessKey: secretAccessKey };
        
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        }
    }
}
