import { Command } from "@tauri-apps/api/shell";
import { CommandOutput } from "../cli-utils/commandOutput";

interface EC2Instance {
    Id: string;
    InstanceType: string;
    AvailabilityZone: string;
    SecurityGroup?: string;
    Platform?: string;
    InstanceStatus?: string;
    LaunchTime: string;
    Tags?: Tag[];
}

interface Tag {
    Key: string;
    Value: string;
}

interface MappedInstance {
    id: string;
    instanceType: string;
    availabilityZone: string;
    securityGroup: string;
    platform: string;
    instanceStatus: string;
    launchTime: string;
    type: string;
}



export async function getEc2Instances(
    region: string,
    profile: string
): Promise<MappedInstance[] | false> {
    try {
        const command = new Command("aws-cli", [
            "ec2",
            "describe-instances",
            "--query",
            "Reservations[*].Instances[*].{Id: InstanceId, InstanceType: InstanceType, AvailabilityZone: Placement.AvailabilityZone, SecurityGroup: SecurityGroups[0].GroupName, Platform: PlatformDetails, InstanceStatus: State.Name, LaunchTime: LaunchTime, Tags: Tags}",
            "--region",
            region,
            "--profile",
            profile,
            "--output",
            "json"
        ]);

        const output: CommandOutput = await command.execute();
        const stdout = output.stdout?.toString() || '';
        const json: EC2Instance[][] = JSON.parse(stdout);

        // console.log('JSON Response from ec2 cli fn: ', json);

        const mappedData: MappedInstance[] = json.flatMap((regionData: EC2Instance[]) =>
            regionData.map(instance => {
                let instanceType = 'On-Demand';

                if (instance.Tags) {
                    const spotTag = instance.Tags.find(tag => tag.Key === "aws:autoscaling:groupName");

                    // spot tag exa: "AWSBatch-ComputeEnvSpotCPU-3340ba86-2e48-4672-ae5c-746d4f7e4985-asg-dbee394a-fbc2-3cef-936e-88ea32fe5164"

                    if (spotTag && spotTag.Value.includes("Spot")) {
                        instanceType = 'Spot';
                    }
                }

                return {
                    id: instance.Id,
                    instanceType: instance.InstanceType,
                    availabilityZone: instance.AvailabilityZone,
                    securityGroup: instance.SecurityGroup || '-',
                    platform: instance.Platform || '-',
                    instanceStatus: instance.InstanceStatus || '-',
                    launchTime: instance.LaunchTime,
                    type: instanceType
                };
            })
        );

        return mappedData || [];

    } catch (error) {
        console.error(error instanceof Error ? error.message : error);
        return false;
    }
}
