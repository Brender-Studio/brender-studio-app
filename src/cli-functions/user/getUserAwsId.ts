import { Command } from "@tauri-apps/api/shell";

export async function getUserAwsId(profile: string) {

    try {
        const command = new Command('aws-cli', [
            'sts',
            'get-caller-identity',
            '--profile',
            profile,
            '--output',
            'json'
        ]);

        const output = await command.execute();
        const outputJson = JSON.parse(output.stdout || '{}');

        const awsAccountId = outputJson.Account || '';

        if (output.code !== 0) {
            console.error(`Failed to get AWS Account ID with code ${output.code}`);
            console.error(`stderr: ${output.stderr?.toString()}`);
            throw new Error(output.stderr?.toString());
        }

        return awsAccountId;

    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        }
    }
}
