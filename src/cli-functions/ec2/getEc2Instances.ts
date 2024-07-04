import { Command } from "@tauri-apps/api/shell";



export async function getEc2Instances(region: string, profile: string) {

    // query example: aws ec2 describe-instances --query 'Reservations[*].Instances[*].{Id: InstanceId, InstanceType: InstanceType, AvailabilityZone: Placement.AvailabilityZone, SecurityGroup: SecurityGroups[0].GroupName, Platform: PlatformDetails, InstanceStatus: State.Name, LaunchTime: LaunchTime}' --output json --region us-east-1

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

        const output = await command.execute();
        const stdout = output.stdout?.toString() || '';
        const json = JSON.parse(stdout);

        // console.log('JSON Response from ec2 cli fn: ', json);

        const mappedData = json.flatMap((regionData: any[]) =>
            regionData.map(instance => {
                let instanceType = 'On-Demand'; // Por defecto, asumimos que es una instancia on-demand

                // Comprobar si hay etiquetas (tags)
                if (instance.Tags) {
                    const spotTag = instance.Tags.find((tag: any) => tag.Key === "aws:autoscaling:groupName");

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
                    instanceStatus: (instance.InstanceStatus) ? instance.InstanceStatus : '-',
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