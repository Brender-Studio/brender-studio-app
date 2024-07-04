import { Command } from "@tauri-apps/api/shell";
import { deployConfig } from "../deploy/deploy-config/deployConfig";


export async function getEcrImages(region: string, profile: string) {

    try {
        const command = new Command("aws-cli", [
            "ecr",
            "describe-images",
            "--repository-name",
            deployConfig.ecr.repositoryName,
            "--region",
            region,
            "--profile",
            profile,
            "--output",
            "json"
        ]);

        const output = await command.execute();
        const stdout = output.stdout?.toString() || '';
        const json = JSON.parse(stdout);

        return json;

    } catch (error) {
        console.error(error instanceof Error ? error.message : error);
        return false;
    }
}