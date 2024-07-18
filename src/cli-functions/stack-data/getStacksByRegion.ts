import { Command } from "@tauri-apps/api/shell";

interface StackSummary {
    StackName: string;
    StackId: string;
    CreationTime: string;
    LastUpdatedTime: string;
    StackStatus: string;
    DriftInformation: {
        StackDriftStatus: string;
    };
}

export async function getStacksByRegion(region: string, profile: string) {
    const command = new Command("aws-cli", [
        "cloudformation",
        "list-stacks",
        "--stack-status-filter",
        "CREATE_COMPLETE",
        "CREATE_IN_PROGRESS",
        "DELETE_IN_PROGRESS",
        "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS",
        "UPDATE_IN_PROGRESS",
        "ROLLBACK_COMPLETE",
        "--region", region,
        "--profile", profile
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
        const stackSummaries = JSON.parse(stdout).StackSummaries || [];

        // Filter stacks based on the criteria
        const filteredStacks = stackSummaries.filter((stack: StackSummary) => {
            const isBrenderStack = stack.StackName.startsWith("BRENDER-STACK-");
            return isBrenderStack;
        });

        return filteredStacks || [];
    } catch (error) {
        if (error instanceof Error) {
            console.error(`An error occurred: ${error.message}`);
            throw error;
        }
    }
}
