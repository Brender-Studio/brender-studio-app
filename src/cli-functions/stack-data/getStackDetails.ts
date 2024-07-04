import { Command } from "@tauri-apps/api/shell";
import { handleCommandClose, handleCommandError } from "../cli-utils/commandOutput";

export async function getStackDetails(stackName: string, region: string, profile: string) {
    try {

        // ### OLD COMMAND - describe-stack-resources ###

        // const command = new Command("aws-cli", [
        //     "cloudformation",
        //     "describe-stack-resources",
        //     "--stack-name",
        //     stackName,
        //     "--query",
        //     "StackResources[?ResourceType=='AWS::Batch::JobDefinition' || ResourceType=='AWS::EC2::NatGateway' || ResourceType=='AWS::EC2::Subnet' || ResourceType=='AWS::EC2::SecurityGroup' || ResourceType=='AWS::EC2::VPC' || ResourceType=='AWS::EC2::VPCEndpoint' || ResourceType=='AWS::Batch::ComputeEnvironment' || ResourceType=='AWS::Batch::JobQueue' || ResourceType=='AWS::S3::Bucket' || ResourceType=='AWS::EFS::FileSystem']",
        //     "--region",
        //     region,
        //     "--profile",
        //     profile,
        //     "--output",
        //     "json"
        // ]);

        // ### NEW COMMAND - list-stack-resources ###

        const command = new Command("aws-cli", [
            "cloudformation",
            "list-stack-resources",
            "--stack-name",
            stackName,
            "--query",
            "StackResourceSummaries[?ResourceType=='AWS::Batch::JobDefinition' || ResourceType=='AWS::EC2::NatGateway' || ResourceType=='AWS::EC2::VPC' || ResourceType=='AWS::Batch::ComputeEnvironment' || ResourceType=='AWS::Batch::JobQueue' || ResourceType=='AWS::S3::Bucket' || ResourceType=='AWS::EFS::FileSystem' || ResourceType=='AWS::EC2::Instance' || ResourceType=='AWS::EC2::NetworkInterface' || ResourceType=='AWS::EC2::SecurityGroup' || ResourceType=='AWS::EC2::Subnet' || ResourceType=='AWS::EC2::VPC']",
            "--region",
            region,
            "--profile",
            profile,
            "--output",
            "json"
        ]);
        // console.log('command', command)
        
        command.on('close', data => {
            handleCommandClose(data);
        });
        command.on('error', error => {
            handleCommandError(error);
        });

        const output = await command.execute();
        // console.log('output', output)
        const stdout = output.stdout?.toString() || '';
        // console.log('stdout', stdout)

        // Parse the JSON output
        const stackDetails = JSON.parse(stdout) || [];
        // console.log('stackDetails', stackDetails)

        return stackDetails;

    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        }
    }
}