import { Command } from "@tauri-apps/api/shell";
import { deployConfig } from "../deploy/deploy-config/deployConfig";

export async function deleteEcrImages(region: string, profile: string, images: string[]) {
    try {
        const imageDigestArgs = images.map((image) => ["imageDigest=" + image]).flat();

        const command = new Command("aws-cli", [
            "ecr",
            "batch-delete-image",
            "--repository-name",
            deployConfig.ecr.repositoryName,
            "--image-ids",
            ...imageDigestArgs,
            "--region",
            region,
            "--profile",
            profile,
            "--output",
            "json"
        ]);

        // console.log('command', command);

        const output = await command.execute();
        const stdout = output.stdout?.toString() || '';
        const json = JSON.parse(stdout);

        return json;
    } catch (error) {
        console.error(error instanceof Error ? error.message : error);
        return false;
    }
}
