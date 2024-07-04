import { Command } from "@tauri-apps/api/shell";


export async function getComputeEnvs(region: string, profile: string, stackName: string) {

    // describe compute environments by stack name tag

    try {
        const command = new Command("aws-cli", [
            "batch",
            "describe-compute-environments",
            "--query",
            `computeEnvironments[?tags.StackName == '${stackName}']`,
            "--region",
            region,
            "--profile",
            profile,
            "--output",
            "json"
        ]);

        const output = await command.execute();
        const stderr = output.stderr?.toString() || '';

        if (output.code !== 0) {
            console.error(`Command failed with code ${output.code}`);
            console.error(`stderr: ${stderr}`);
            throw new Error(stderr);
        }

        const computeEnvs = JSON.parse(output.stdout.toString());
        // console.log('computeEnvs', computeEnvs)
        return computeEnvs;

    } catch (error) {
        if (error instanceof Error) {
            console.log('error', error.message)
            throw error;
        }
    }


}