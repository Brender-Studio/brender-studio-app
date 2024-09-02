import { Command } from "@tauri-apps/api/shell";
import { deployConfig } from "../deploy-config/deployConfig";

// create s3 bucket for buildspec.yml source for codebuild task
export async function createBuildBucket(region: string, profile: string) {
    const bucketNamePrefix = deployConfig.s3_codebuild.bucketName;

    // Use the current timestamp for uniqueness
    const timestamp = Date.now();
    const bucketName = `${bucketNamePrefix}-${timestamp}`;

    console.log('Creating bucket:', bucketName);

    try {
        // Define the base command
        const commandArgs = [
            "s3api",
            "create-bucket",
            "--bucket", bucketName,
            "--profile", profile
        ];

        // Add region-specific configuration if the region is not us-east-1
        if (region !== 'us-east-1') {
            commandArgs.push("--create-bucket-configuration", `LocationConstraint=${region}`);
        } else {
            commandArgs.push("--region", region);
        }

        const createBucketCommand = new Command('aws-cli', commandArgs);

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
