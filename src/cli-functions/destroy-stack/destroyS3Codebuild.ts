import { Command } from "@tauri-apps/api/shell";
import { deployConfig } from "../deploy/deploy-config/deployConfig";

export async function destroyS3Codebuild(region: string, profile: string) {
    const bucketNamePrefix = deployConfig.s3_codebuild.bucketName;

    try {
        // List all buckets with the prefix
        const listBucketsCommand = new Command('aws-cli', [
            "s3api",
            "list-buckets",
            "--query", `Buckets[?starts_with(Name, '${bucketNamePrefix}')].Name`,
            "--region", region,
            "--profile", profile
        ]);

        const listOutput = await listBucketsCommand.execute();
        const listStderr = listOutput.stderr?.toString() || '';

        if (listOutput.code !== 0) {
            console.error(`Failed to list buckets with code ${listOutput.code}`);
            console.error(`stderr: ${listStderr}`);
            throw new Error(listStderr);
        }

        const bucketNamesJson = listOutput.stdout?.toString().trim();
        const bucketNames: string[] = JSON.parse(bucketNamesJson || '[]');

        console.log('Buckets to delete:', bucketNames);

        if (bucketNames.length === 0) {
            console.log('No buckets to delete.');
            return;
        }

        // Delete each bucket
        for (const bucketName of bucketNames) {
            console.log(`Deleting bucket: ${bucketName}`);

            // Delete the bucket with force
            const deleteBucketCommand = new Command('aws-cli', [
                "s3",
                "rb",
                `s3://${bucketName}`,
                "--force",
                "--region", region,
                "--profile", profile
            ]);

            const deleteOutput = await deleteBucketCommand.execute();
            const deleteStderr = deleteOutput.stderr?.toString() || '';

            if (deleteOutput.code !== 0) {
                console.error(`Failed to delete bucket ${bucketName} with code ${deleteOutput.code}`);
                console.error(`stderr: ${deleteStderr}`);
                throw new Error(deleteStderr);
            }

            console.log(`Bucket deleted: ${bucketName}`);
        }

        return true;

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        throw new Error(`${(error as Error).message}`);
    }
}