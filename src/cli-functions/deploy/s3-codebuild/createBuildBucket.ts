import { Command } from "@tauri-apps/api/shell";
import { deployConfig } from "../deploy-config/deployConfig";

// create s3 bucket for buildspec.yml source for codebuild task
export async function createBuildBucket(region: string, profile: string) {
    const bucketNamePrefix = deployConfig.s3_codebuild.bucketName;

    // Use the current timestamp for uniqueness
    const timestamp = Date.now();
    const bucketName = `${bucketNamePrefix}-${timestamp}`;

    try {
        // 1. Create the s3 bucket
        const createBucketCommand = new Command('aws-cli', [
            "s3api",
            "create-bucket",
            "--bucket", bucketName,
            "--region", region,
            "--profile", profile
        ]);

        const bucketOutput = await createBucketCommand.execute();
        const bucketStderr = bucketOutput.stderr?.toString() || '';

        if (bucketOutput.code !== 0) {
            console.error(`Failed to create bucket with code ${bucketOutput.code}`);
            console.error(`stderr: ${bucketStderr}`);
            throw new Error(bucketStderr);
        }

        console.log('Bucket Name:', bucketName);
        console.log('bucketOutput:', bucketOutput.stdout?.toString());

        return bucketName;

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        throw new Error(`${(error as Error).message}`);
    }
}