import { DataTableAutoscaling } from "./DataTableAutoscaling"
import { columns } from "./columns"
import useGetAutoscalingGroupsQuery from "@/react-query-utils/queries/ec2-queries/useGetAutoscalingGroupsQuery"
import { useUserSessionStore } from "@/store/useSessionStore"

const ListAutoscaling = () => {
    // const { currentStack, currentAwsRegion, currentProfile } = useUserSessionStore()
    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentAwsRegion, currentProfile, currentStack } = sessionData;

    const { data, isLoading } = useGetAutoscalingGroupsQuery();

    return (
        <div>
            <DataTableAutoscaling
                isQueryLoading={isLoading}
                columns={columns}
                data={data || []}
                linkAwsConsole={`https://${currentAwsRegion}.console.aws.amazon.com/ec2/home?region=${currentAwsRegion}#AutoScalingGroups:`}
                awsRegion={currentAwsRegion}
                // Revisar valores de awsProfile y currentStack que puedan ser nulos?
                awsProfile={currentProfile || ''}
                currentStack={currentStack || ''}
            />
        </div>
    )
}

export default ListAutoscaling