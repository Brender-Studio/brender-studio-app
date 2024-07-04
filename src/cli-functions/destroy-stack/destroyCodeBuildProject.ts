import { Command } from "@tauri-apps/api/shell";
import { deployConfig } from "../deploy/deploy-config/deployConfig";



export async function destroyCodeBuild (region: string, profile: string) {

    try {
        // 1. Destroy the project
        const destroyProjectCommand = new Command('aws-cli', [
            "codebuild",
            "delete-project",
            "--name", deployConfig.codeBuild.projectName,
            "--region", region,
            "--profile", profile
        ]);

        console.log('Destroy project command:', destroyProjectCommand);

        const destroyProjectOutput = await destroyProjectCommand.execute();
        console.log('Destroy project output:', destroyProjectOutput);
        const destroyProjectStderr = destroyProjectOutput.stderr?.toString() || '';

        if (destroyProjectOutput.code !== 0) {
            console.error(`Failed to destroy project with code ${destroyProjectOutput.code}`);
            console.error(`stderr: ${destroyProjectStderr}`);
            throw new Error(destroyProjectStderr);
        }

        return true;

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return false;
    }

}