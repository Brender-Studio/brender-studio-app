import { Command } from "@tauri-apps/api/shell";
import { cleanOutputProfiles, handleCommandClose, handleCommandError } from "../cli-utils/commandOutput";

export async function getAllAWSProfiles(): Promise<string[] | string | undefined> {
    try {
        const awsCliCommand = new Command('aws-cli', ["configure", "list-profiles", "--output", "json"]);

        // console.log('Executing command: ');
        awsCliCommand.on('close', (data) => {
            handleCommandClose(data);
        });

        awsCliCommand.on('error', (error) => {
            handleCommandError(error);
        });

        const childProcess = await awsCliCommand.execute();
        // console.log(childProcess.stdout?.toString() || '');

        const childOutput = childProcess.stdout?.toString()
        // const cleanedOutput = cleanOutput(childOutput);
        const cleanedOutput = cleanOutputProfiles(childOutput);

        if (cleanedOutput === undefined) {
            console.log('No output from command');
            return []; 
        }
        // console.log('Cleaned output:', cleanedOutput);

        const profiles = cleanedOutput.trim().split('\n');
        // console.log('Profiles from fn cli:', profiles);
        return profiles;
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        }
    }
}

