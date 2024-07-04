import { Command } from '@tauri-apps/api/shell';


// returns a presigned url for a thumbnail of the given image

export async function getThumbnailUrl(bucket: string, profile: string, region: string, key: string) {
    try {
        const command = new Command('aws-cli', [
            "s3",
            "presign",
            `s3://${bucket}/${key}`,
            "--expires-in", "3600",
            "--region", region,
            "--profile", profile,
            "--output",
            "json"
        ]);

        let errorOutput = '';

        command.stderr.on('data', data => {
            errorOutput += data.toString();
        });

        const child = await command.execute();

        if (child.code !== 0) {
            throw new Error(`Command failed with code ${child.code}. Error: ${errorOutput}`);
        }

        const url = child.stdout.toString().trim();

        return url;
    } catch (error) {
        throw new Error(`Error in getThumbnailUrl: ${error}`);
    }
}