import { Command } from "@tauri-apps/api/shell";
import { S3_UPLOAD_CONFIGS } from "./s3-cli-config";

// This function sets the S3 CLI config based on the size of the file (.blend) being uploaded. Improves upload performance.

export async function setS3cliConfig(region: string, profile: string, size: number) {
    // Function to convert bytes to MB
    const bytesToMB = (bytes: number) => bytes / (1024 * 1024);

    // Convert size to MB
    const sizeMB = bytesToMB(size);

    // Get the S3 CLI config based on the size
    let config;
    if (sizeMB <= 100) {
        config = S3_UPLOAD_CONFIGS["100MB"];
    } else if (sizeMB <= 200) {
        config = S3_UPLOAD_CONFIGS["200MB"];
    } else if (sizeMB <= 500) {
        config = S3_UPLOAD_CONFIGS["500MB"];
    } else if (sizeMB <= 1024) {
        config = S3_UPLOAD_CONFIGS["1GB"];
    } else if (sizeMB <= 2048) {
        config = S3_UPLOAD_CONFIGS["2GB"];
    } else if (sizeMB <= 5120) {
        config = S3_UPLOAD_CONFIGS["5GB"];
    } else {
        config = S3_UPLOAD_CONFIGS["10GB"];
    }

    // console.log(`Setting S3 CLI config to: ${JSON.stringify(config)}`);

    // Array of settings to apply
    // const configSettings = [
    //     { key: "default.s3.max_concurrent_requests", value: config.maxConcurrentRequests.toString() },
    //     { key: "default.s3.multipart_chunksize", value: config.multipartChunksize },
    //     { key: "default.s3.max_bandwidth", value: config.maxBandwidth },
    //     { key: "default.s3.multipart_threshold", value: config.multipartThreshold },
    //     { key: "default.s3.max_queue_size", value: config.maxQueueSize.toString() }
    // ];

    const configSettings = [
        { key: `profile.${profile}.s3.max_concurrent_requests`, value: config.maxConcurrentRequests.toString() },
        { key: `profile.${profile}.s3.multipart_chunksize`, value: config.multipartChunksize },
        { key: `profile.${profile}.s3.max_bandwidth`, value: config.maxBandwidth },
        { key: `profile.${profile}.s3.multipart_threshold`, value: config.multipartThreshold },
        { key: `profile.${profile}.s3.max_queue_size`, value: config.maxQueueSize.toString() }
    ];


    // Apply the settings
    for (const setting of configSettings) {
        const command = new Command("aws-cli", [
            "configure",
            "set",
            setting.key,
            setting.value,
            "--profile",
            profile,
            "--region",
            region
        ]);

        await command.execute();
    }
}