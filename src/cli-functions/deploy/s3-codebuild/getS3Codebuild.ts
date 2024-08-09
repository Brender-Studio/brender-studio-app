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
            return { exists: false, bucketName: null };
        }

        // Ordenar los nombres de los buckets por el timestamp
        const sortedBucketNames = bucketNames.sort((a, b) => {
            const timestampA = a.split('-').pop();
            const timestampB = b.split('-').pop();
            return (timestampB || '').localeCompare(timestampA || '');
        });

        const mostRecentBucketName = sortedBucketNames[0];

        return { exists: true, bucketName: mostRecentBucketName };

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        throw new Error(`${(error as Error).message}`);
    }
}