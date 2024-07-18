import { Command } from "@tauri-apps/api/shell";

interface AutoscalingGroup {
    AutoScalingGroupARN: string;
    AutoScalingGroupName: string;
    AvailabilityZones: string[];
    CreatedTime: string;
    Instances: number[];
}


export interface AutoscalingGroupMapped {
    id: string;
    name: string;
    instances: number;
    availabilityZones: string;
    createdTime: string;
}


export async function getAutoscalingGroups(
    region: string,
    profile: string,
    stackName: string
): Promise<AutoscalingGroupMapped[]> {


    // Filter by tag StackName to get the autoscaling groups of a particular stack

    try {
        const command = new Command("aws-cli", [
            "autoscaling",
            "describe-auto-scaling-groups",
            "--query",
            `AutoScalingGroups[?Tags[?Key=='StackName'] && Tags[?Value=='${stackName}']]`,
            "--region",
            region,
            "--profile",
            profile,
            "--output",
            "json"
        ]);

        const output = await command.execute();
        const stdout = output.stdout?.toString() || '';
        const json: AutoscalingGroup[] = JSON.parse(stdout);

        // console.log('JSON Response from autoscaling cli fn: ', json);

        const mappedData = json.map((group: AutoscalingGroup): AutoscalingGroupMapped => {
            return {
                id: group.AutoScalingGroupName,
                name: group.AutoScalingGroupName,
                instances: group.Instances.length,
                availabilityZones: group.AvailabilityZones.join(', '),
                createdTime: group.CreatedTime
            };
        });

        return mappedData || [];
    } catch (error) {
        console.error('Error getting autoscaling groups: ', error);
        return [];
    }
}