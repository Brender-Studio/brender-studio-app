import { Command } from "@tauri-apps/api/shell";

interface EmptyBucketParams {
    bucket: string
    region: string
    profile: string
}

export async function emptyBucket({ bucket, region, profile }: EmptyBucketParams) {
    try {
        const command = new Command('aws-cli', [
            "s3",
            "rm",
            `s3://${bucket}`,
            "--recursive",
            "--region", region,
            "--profile", profile
        ]);

        let errorOutput = '';

        command.stderr.on('data', data => {
            errorOutput += data.toString();
        });

        const child = await command.execute();

        if (child.code !== 0) {
            throw new Error(`Command failed with code ${child.code}. Error: ${errorOutput}`);
        }

        // console.log('Bucket emptied:', bucket);

        return true;

    } catch (error) {
        console.error('Error:', error)
        throw error;
    }
}