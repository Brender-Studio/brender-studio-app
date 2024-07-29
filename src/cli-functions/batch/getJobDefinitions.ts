import { Command } from "@tauri-apps/api/shell";

//  aws batch describe-job-definitions --query "jobDefinitions[?tags.StackName=='BRENDER-STACK-WITH-TAGS']" --output json

export async function getJobDefinitions(stackName: string, region: string, profile: string) {
    try {
        
        const command = new Command("aws-cli", [
            "batch",
            "describe-job-definitions",
            "--query",
            `jobDefinitions[?tags.StackName=='${stackName}']`,
            "--region",
            region,
            "--profile",
            profile,
            "--output",
            "json"
        ]);


        const output = await command.execute();
        // console.log('jobDefinitions output', output)

        const stderr = output.stderr?.toString() || '';


        if (output.code !== 0) {
            console.error(`Command failed with code ${output.code}`);
            console.error(`stderr: ${stderr}`);
            throw new Error(stderr);
        }

        const stdout = output.stdout?.toString() || '';
        // console.log('jobDefinitions stdout', stdout)
        const jobDefinitions = JSON.parse(stdout) || [];
        // console.log('jobDefinitions', jobDefinitions)
        return jobDefinitions || [];

    } catch (error) {
        if (error instanceof Error) {
            // console.log('error', error.message)
            throw error;
        }
    }
}