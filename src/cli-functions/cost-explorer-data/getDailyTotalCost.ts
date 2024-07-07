import { Command } from "@tauri-apps/api/shell"


export async function getDailyTotalCost(currentProfile: string, currentAwsRegion: string, currentStack: string, startDate: string, endDate: string) {

    console.log(currentStack)
    try {
        const command = new Command("aws-cli", [
            "ce",
            "get-cost-and-usage",
            "--time-period",
            `Start="${startDate}",End="${endDate}"`,
            "--granularity",
            "DAILY",
            "--metrics",
            "BlendedCost",
            "--group-by",
            "Type=DIMENSION,Key=SERVICE",
            "--filter",
            `{"Tags": {"Key": "StackName", "Values": ["${currentStack}"]}}`,
            "--profile",
            currentProfile,
            "--region",
            currentAwsRegion,
        ]);

        console.log('Running Command Charts', command)

        const result = await command.execute();

        if (!result.stdout) {
            throw new Error('Empty output received');
        }

        const costData = JSON.parse(result.stdout);
        console.log('CostData: ', costData);

        return costData;

    } catch (error) {
        console.error(error instanceof Error ? error.message : error);
        throw error;
    }
}


// import { Command } from "@tauri-apps/api/shell"


// export async function getDailyTotalCost(
//     currentProfile: string,
//     currentAwsRegion: string,
//     currentStack: string,
//     startDate: string,
//     endDate: string
// ): Promise<CostAndUsageResponse> {
    
//     try {
//         const command = new Command("aws-cli", [
//             "ce",
//             "get-cost-and-usage",
//             "--time-period",
//             `Start="${startDate}",End="${endDate}"`,
//             "--granularity",
//             "DAILY",
//             "--metrics",
//             "BlendedCost",
//             "--group-by",
//             "Type=DIMENSION,Key=SERVICE",
//             "--filter",
//             `{"Tags": {"Key": "StackName", "Values": ["${currentStack}"]}}`,
//             "--profile",
//             currentProfile,
//             "--region",
//             currentAwsRegion,
//         ]);

//         console.log('Running Command Charts', command);

//         const result = await command.execute();

//         if (!result.stdout) {
//             throw new Error('Empty output received');
//         }

//         const costData: CostAndUsageResponse = JSON.parse(result.stdout);
//         console.log('CostData: ', costData);

//         return costData;

//     } catch (error) {
//         console.error(error instanceof Error ? error.message : error);
//         throw error;
//     }
// }