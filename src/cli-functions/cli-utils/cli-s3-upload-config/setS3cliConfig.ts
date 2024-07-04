import { Command } from "@tauri-apps/api/shell";
import { S3_UPLOAD_CONFIGS } from "./s3-cli-config";

export async function setS3cliConfig(region: string, profile: string, size: number) {
    // Función para convertir bytes a MB
    const bytesToMB = (bytes: number) => bytes / (1024 * 1024);

    // Convertir size a MB
    const sizeMB = bytesToMB(size);

    // Determinar la configuración apropiada
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

    console.log(`Setting S3 CLI config to: ${JSON.stringify(config)}`);

    // Array de configuraciones a establecer
    const configSettings = [
        { key: "default.s3.max_concurrent_requests", value: config.maxConcurrentRequests.toString() },
        { key: "default.s3.multipart_chunksize", value: config.multipartChunksize },
        { key: "default.s3.max_bandwidth", value: config.maxBandwidth },
        { key: "default.s3.multipart_threshold", value: config.multipartThreshold },
        { key: "default.s3.max_queue_size", value: config.maxQueueSize.toString() }
    ];

    // Aplicar cada configuración
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