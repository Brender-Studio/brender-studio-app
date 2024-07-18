import { columns } from './columns'
import { DataTableActivityLogs } from './DataTableActivityLogs'
import useGetAutoscalingActivityQuery from '@/react-query-utils/queries/ec2-queries/useGetAutoscalingActivityQuery'
import { useUserSessionStore } from '@/store/useSessionStore'

interface ListActivityLogsProps {
    autoscalingGroupName: string
}

const ListActivityLogs = ({ autoscalingGroupName }: ListActivityLogsProps) => {

    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentAwsRegion, currentProfile, currentStack } = sessionData;

    // console.log('autoscalingGroupName', autoscalingGroupName)
    const { data, isLoading } = useGetAutoscalingActivityQuery(autoscalingGroupName)


    return (
        <div>
            <DataTableActivityLogs
                isQueryLoading={isLoading}
                columns={columns}
                data={data || []}
                linkAwsConsole={`https://${currentAwsRegion}.console.aws.amazon.com/ec2/home?region=${currentAwsRegion}#AutoScalingGroupDetails:id=${autoscalingGroupName};view=activity`}
                awsRegion={currentAwsRegion}
                awsProfile={currentProfile || ''}
                currentStack={currentStack || ''}
                activityGroupName={autoscalingGroupName}
            />
        </div>
    )
}

export default ListActivityLogs