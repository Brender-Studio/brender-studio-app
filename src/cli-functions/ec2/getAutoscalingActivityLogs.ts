import { Command } from "@tauri-apps/api/shell";


export async function getAutoscalingActivityLogs(region: string, profile: string, autoscalingGroupName: string){
    try {
        const command = new Command("aws-cli", [
            "autoscaling",
            "describe-scaling-activities",
            "--auto-scaling-group-name",
            autoscalingGroupName,
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

        console.log('JSON Response from autoscaling activity logs cli fn: ', json);

        const mappedData = json.Activities.map((activity: any) => {
            return {
                // id: activity.ActivityId,
                status: activity.StatusCode,
                description: activity.Description,
                cause: activity.Cause,
                startTime: activity.StartTime,
                endTime: activity.EndTime,
            };
        });

        return mappedData || [];
    } catch (error) {
        console.error('Error getting autoscaling activity logs: ', error);
        return [];
    }
}
