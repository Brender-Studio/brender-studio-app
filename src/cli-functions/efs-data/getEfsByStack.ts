import { Command } from "@tauri-apps/api/shell";


export async function getEfsByStack(stackName: string, region: string, profile: string) {

    try {
        const command = new Command("aws-cli", [
            "efs",
            "describe-file-systems",
            "--query",
            `FileSystems[?Tags[?Key=='StackName' && Value=='${stackName}']]`,
            "--region",
            region,
            "--profile",
            profile,
            "--output",
            "json"
        ]);

        const output = await command.execute();
        // console.log('Output:', output)
        const stdout = output.stdout?.toString() || '';
        // console.log('Stdout:', stdout)
        const json = JSON.parse(stdout);

        return json;

    } catch (error) {
        console.error(error instanceof Error ? error.message : error);
        return false;
    }
}