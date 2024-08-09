// import { readTextFile } from "@tauri-apps/api/fs";
import { resolveResource } from '@tauri-apps/api/path';
import { Command } from "@tauri-apps/api/shell";

export async function uploadBuildspecS3(region: string, profile: string, bucketName: string) {
    const buildspecPath = await resolveResource("resources/deploy/buildspec.yml");
    // const buildspecContent = await readTextFile(buildspecPath);

    try {
        const uploadBuildspecCommand = new Command('aws-cli', [
            "s3",
            "cp",
            buildspecPath,
            `s3://${bucketName}/buildspec/buildspec.yml`,
            "--region", region,
            "--profile", profile
        ]);

        const uploadOutput = await uploadBuildspecCommand.execute();

        const uploadStderr = uploadOutput.stderr?.toString() || '';

        if (uploadOutput.code !== 0) {
            console.error(`Failed to upload buildspec with code ${uploadOutput.code}`);
            console.error(`stderr: ${uploadStderr}`);
            throw new Error(uploadStderr);
        }

        console.log('Buildspec uploaded successfully to S3');
        return true;

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        throw new Error(`${(error as Error).message}`);
    }
}