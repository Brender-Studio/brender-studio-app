import { Command } from "@tauri-apps/api/shell";


interface AWSActivityLog {
    ActivityId: string;
    StatusCode: string;
    Description: string;
    Cause: string;
    StartTime: string;
    EndTime: string;
}

interface MappedActivity {
    status: string;
    description: string;
    cause: string;
    startTime: string;
    endTime: string;
}

export async function getAutoscalingActivityLogs(
    region: string,
    profile: string,
    autoscalingGroupName: string
): Promise<MappedActivity[]> {


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
        const json: { Activities: AWSActivityLog[] } = JSON.parse(stdout);

        // console.log('JSON Response from autoscaling activity logs cli fn: ', json);

        const mappedData: MappedActivity[] = json.Activities.map((activity: AWSActivityLog) => {
            return {
                status: activity.StatusCode,
                description: activity.Description,
                cause: activity.Cause,
                startTime: activity.StartTime,
                endTime: activity.EndTime,
            };
        });

        return mappedData;
    } catch (error) {
        console.error('Error getting autoscaling activity logs: ', error);
        return [];
    }
}
