import { Command } from "@tauri-apps/api/shell";
import { deployConfig } from "../deploy/deploy-config/deployConfig";


export async function destroyCodeCommit(region: string, profile: string) {

    try {
        // 1. Destroy the repository
        const destroyRepoCommand = new Command('aws-cli', [
            "codecommit",
            "delete-repository",
            "--repository-name", deployConfig.codecommit.repositoryName,
            "--region", region,
            "--profile", profile
        ]);
        console.log('Destroy repository command:', destroyRepoCommand);

        const destroyRepoOutput = await destroyRepoCommand.execute();
        console.log('Destroy repository output:', destroyRepoOutput);
        const destroyRepoStderr = destroyRepoOutput.stderr?.toString() || '';

        if (destroyRepoOutput.code !== 0) {
            console.error(`Failed to destroy repository with code ${destroyRepoOutput.code}`);
            console.error(`stderr: ${destroyRepoStderr}`);
            throw new Error(destroyRepoStderr);
        }

        return true;

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return false;
    }

}