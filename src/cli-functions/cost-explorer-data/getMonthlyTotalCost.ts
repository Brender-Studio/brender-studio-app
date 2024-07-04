import { Command } from "@tauri-apps/api/shell";


export async function getMonthlyTotalCost(currentProfile: string, currentAwsRegion: string, currentStack: string, startDate: string, endDate: string) {
    console.log(currentStack)
    try {
        const command = new Command("aws-cli", [
            "ce",
            "get-cost-and-usage",
            "--time-period",
            `Start="${startDate}",End="${endDate}"`,
            "--granularity",
            "MONTHLY",
            "--metrics",
            "BlendedCost",
            "--group-by",
            "Type=DIMENSION,Key=SERVICE",
            "--filter",
            `{"Tags": {"Key": "StackName", "Values": ["${currentStack}"]}}`,
            "--region",
            currentAwsRegion,
            "--profile",
            currentProfile,
        ]);

        console.log("Running command Table Explorer: ", command)

        const result = await command.execute();

        if (!result.stdout) {
            throw new Error('Empty output received while fetching monthly cost data');
        }

        const dataTotalCost = JSON.parse(result.stdout);
        console.log('Data Total Cost: ', dataTotalCost);
        return dataTotalCost

    } catch (error) {
        console.error(error instanceof Error ? error.message : error);
        throw error;
    }
}
