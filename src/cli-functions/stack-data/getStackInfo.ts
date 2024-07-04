import { Command } from "@tauri-apps/api/shell";


// ex: aws cloudformation describe-stacks --stack-name BRENDER-STACK-test-create

export async function getStackInfo(stackName: string, region: string, profile: string) {
    const command = new Command("aws-cli", [
        "cloudformation",
        "describe-stacks",
        "--stack-name",
        stackName,
        "--region",
        region,
        "--profile",
        profile,
        "--output",
        "json"
    ]);

    try {
        const output = await command.execute();
        const stdout = output.stdout?.toString() || '';
        const stderr = output.stderr?.toString() || '';

        if (output.code !== 0) {
            console.error(`Command failed with code ${output.code}`);
            console.error(`stderr: ${stderr}`);
            throw new Error(stderr);
        }

        // Parse the JSON output
        const stackInfo = JSON.parse(stdout).Stacks || [];

        // console.log('stackInfo', stackInfo)

        return stackInfo;
    } catch (error) {
        if (error instanceof Error) {
            console.error(`An error occurred: ${error.message}`);
            throw error;
        }
    }
}