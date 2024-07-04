import { Command } from "@tauri-apps/api/shell";


export async function terminateInstances(region: string, profile: string, instances: string[]) {
    try {
        const instanceIds = instances.map((instance) => [instance]).flat();

        console.log('instanceIds', instanceIds)

        const command = new Command("aws-cli", [
            "ec2",
            "terminate-instances",
            "--instance-ids",
            ...instanceIds,
            "--region",
            region,
            "--profile",
            profile,
            "--output",
            "json"
        ]);

        console.log('command', command);

        const output = await command.execute();
        const stdout = output.stdout?.toString() || '';
        const json = JSON.parse(stdout);

        return json;
    } catch (error) {
        console.error(error instanceof Error ? error.message : error);
        return false;
    }
}