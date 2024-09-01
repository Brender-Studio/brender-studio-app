import { Command } from "@tauri-apps/api/shell";
import { deployConfig } from "../deploy-config/deployConfig";

export async function getS3Codebuild(region: string, profile: string) {
    const bucketNamePrefix = deployConfig.s3_codebuild.bucketName;

    try {
        const getBucketCommand = new Command('aws-cli', [
            "s3api",
            "list-buckets",
            "--query", `Buckets[?starts_with(Name, '${bucketNamePrefix}')].Name`,
            "--region", region,
            "--profile", profile
        ]);

        const bucketOutput = await getBucketCommand.execute();
        const bucketStderr = bucketOutput.stderr?.toString() || '';

        if (bucketOutput.code !== 0) {
            console.error(`Failed to get bucket with code ${bucketOutput.code}`);
            console.error(`stderr: ${bucketStderr}`);
            throw new Error(bucketStderr);
        }

        const bucketNamesJson = bucketOutput.stdout?.toString().trim();
        const bucketNames: string[] = JSON.parse(bucketNamesJson || '[]');

        console.log('Bucket Names:', bucketNames);

        if (bucketNames.length === 0) {
            return { exists: false, bucketName: null, region: null };
        }

        // sort the bucket names by timestamp
        const sortedBucketNames = bucketNames.sort((a, b) => {
            const timestampA = a.split('-').pop();
            const timestampB = b.split('-').pop();
            return (timestampB || '').localeCompare(timestampA || '');
        });

        const mostRecentBucketName = sortedBucketNames[0];

        // Get the location of the bucket
        const getBucketLocationCommand = new Command('aws-cli', [
            "s3api",
            "get-bucket-location",
            "--bucket", mostRecentBucketName,
            "--profile", profile
        ]);

        const bucketLocationOutput = await getBucketLocationCommand.execute();
        const bucketLocationStderr = bucketLocationOutput.stderr?.toString() || '';

        if (bucketLocationOutput.code !== 0) {
            console.error(`Failed to get bucket location with code ${bucketLocationOutput.code}`);
            console.error(`stderr: ${bucketLocationStderr}`);
            throw new Error(bucketLocationStderr);
        }

        const bucketLocationJson = bucketLocationOutput.stdout?.toString().trim();
        const bucketLocationData = JSON.parse(bucketLocationJson || '{}');
        const bucketRegion = bucketLocationData.LocationConstraint || 'us-east-1';

        // Check if the bucket is in the same region
        const isSameRegion = bucketRegion === region;

        return {
            exists: isSameRegion,
            bucketName: isSameRegion ? mostRecentBucketName : null,
            region: isSameRegion ? bucketRegion : null
        };

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        throw new Error(`${(error as Error).message}`);
    }
}
