import { cleanOutput, handleCommandError } from "@/cli-functions/cli-utils/commandOutput";
import { Command } from "@tauri-apps/api/shell";


export async function getBuildStatus(region: string, profile: string, codeBuildNotifications: string[]) {

    // extract the build ids from the notifications array
    // console.log('codeBuildNotifications:', codeBuildNotifications)
    const ids = codeBuildNotifications.map((notification) => {
        const split = notification.split(' ');
        return split[split.length - 1];
    });

    // console.log('ids:', ids)

    

    try {
        const awsCliCommand = new Command('aws-cli', [
            "codebuild",
            "batch-get-builds",
            "--ids",
            ...ids,
            "--region",
            region,
            "--profile",
            profile,
            "--output",
            "json"
        ]);

        // console.log('Command:', awsCliCommand);
        const output = await awsCliCommand.execute();

        // console.log('Output:', output);

        
        const stdout = cleanOutput(output.stdout);

        const stderr = cleanOutput(output.stderr);

        
        if (output.code !== 0) {
            handleCommandError(stderr);
        }

        const parsedOutput = JSON.parse(stdout);

        return parsedOutput.builds;
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        }
    }
}