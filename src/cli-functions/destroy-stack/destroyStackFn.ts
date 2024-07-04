import { Command } from "@tauri-apps/api/shell";


export async function destroyStackFn(stackName: string, region: string, profile: string) {

    try {
        // 1. Destroy the stack
        const destroyStackCommand = new Command('aws-cli', [
            "cloudformation",
            "delete-stack",
            "--stack-name", stackName,
            "--region", region,
            "--profile", profile
        ]);
        console.log('Destroy stack command:', destroyStackCommand);

        const destroyStackOutput = await destroyStackCommand.execute();
        console.log('Destroy stack output:', destroyStackOutput);
        const destroyStackStderr = destroyStackOutput.stderr?.toString() || '';

        if (destroyStackOutput.code !== 0) {
            console.error(`Failed to destroy stack with code ${destroyStackOutput.code}`);
            console.error(`stderr: ${destroyStackStderr}`);
            throw new Error(destroyStackStderr);
        }

        return true;

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return false;
    }

}