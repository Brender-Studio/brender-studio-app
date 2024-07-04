import { Command } from "@tauri-apps/api/shell";


export async function getAutoscalingGroups(region: string, profile: string, StackName: string ){
    // filtramos por tag StackName para obtener los autoscaling groups de un stack en particular

    try {
        const command = new Command("aws-cli", [
            "autoscaling",
            "describe-auto-scaling-groups",
            "--query",
            `AutoScalingGroups[?Tags[?Key=='StackName'] && Tags[?Value=='${StackName}']]`,
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

        console.log('JSON Response from autoscaling cli fn: ', json);

        const mappedData = json.map((group: any) => {
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