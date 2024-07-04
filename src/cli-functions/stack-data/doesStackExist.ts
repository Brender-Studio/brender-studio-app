import { Command } from "@tauri-apps/api/shell";

export async function doesStackExist(stackName: string, region: string, profile: string): Promise<boolean> {
    try {
        const command = new Command("aws-cli", [
            "cloudformation",
            "describe-stacks",
            "--stack-name",
            stackName.toLocaleUpperCase(),
            "--region",
            region,
            "--profile",
            profile,
            "--output",
            "json"
        ]);

        const output = await command.execute();
        // console.log('output', output)
        // const stdout = output.stdout?.toString() || '';
        // console.log('stdout', stdout)

        if (output.code === 0) {
            // El stack existe
            return true;
        } else if (output.code === 255) {
            // El stack no existe
            return false;
        } else {
            throw new Error(`Command failed with code ${output.code}`);
        }

    } catch (error) {
        console.error(error instanceof Error ? error.message : error);
        return false;
    }
}
