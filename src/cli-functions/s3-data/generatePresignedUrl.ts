import { Command } from "@tauri-apps/api/shell";

interface PresignedUrlParams {
    bucket: string
    key: string
    region: string
    profile: string
    expires: string
}

export async function generatePresignedUrl({ bucket, key, region, profile, expires }: PresignedUrlParams) {
    try {
        const command = new Command('aws-cli', [
            "s3",
            "presign",
            `s3://${bucket}${key}`,
            "--region", region,
            "--profile", profile,
            "--expires-in", expires
        ]);

        let errorOutput = '';

        command.stderr.on('data', data => {
            errorOutput += data.toString();
        });

        const child = await command.execute();

        if (child.code !== 0) {
            throw new Error(`Command failed with code ${child.code}. Error: ${errorOutput}`);
        }

        console.log('url from fn', child.stdout.toString().trim());

        return child.stdout.toString().trim();

    } catch (error) {
        console.error('Error:', error)
    }
}