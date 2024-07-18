import { Command } from "@tauri-apps/api/shell";
import { deployConfig } from "../deploy-config/deployConfig";


export async function createCodeCommit(region: string, profile: string) {

    try {
        // 1. Create the code commit repository
        const createRepositoryCommand = new Command('aws-cli', [
            "codecommit",
            "create-repository",
            "--repository-name", deployConfig.codecommit.repositoryName,
            "--region", region,
            "--profile", profile
        ]);

        const repositoryOutput = await createRepositoryCommand.execute();
        const repositoryStderr = repositoryOutput.stderr?.toString() || '';

        if (repositoryOutput.code !== 0) {
            console.error(`Failed to create repository with code ${repositoryOutput.code}`);
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