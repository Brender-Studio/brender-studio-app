import { Command } from "@tauri-apps/api/shell";
import { deployConfig } from "../deploy-config/deployConfig";

export async function getCodeCommit(region: string, profile: string) {

    try {
        // 1. Get the code commit repository
        const getRepositoryCommand = new Command('aws-cli', [
            "codecommit",
            "get-repository",
            "--repository-name", deployConfig.codecommit.repositoryName,
            "--region", region,
            "--profile", profile
        ]);

        const repositoryOutput = await getRepositoryCommand.execute();
        console.log('Repository Output:', repositoryOutput);
        const repositoryStderr = repositoryOutput.stderr?.toString() || '';

        if (repositoryOutput.code !== 0) {
            console.error(`Failed to get repository with code ${repositoryOutput.code}`);
            console.error(`stderr: ${repositoryStderr}`);
            throw new Error(repositoryStderr);
        }

        return true;

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        throw new Error(`${(error as Error).message}`);
    }
}