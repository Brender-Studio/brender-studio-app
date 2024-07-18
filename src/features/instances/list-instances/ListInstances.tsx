import { DataTableInstance } from "./DataTableInstance"
import { columns } from "./columns"
import useGetEc2InstancesQuery from "@/react-query-utils/queries/ec2-queries/useGetEc2InstancesQuery"
import { useUserSessionStore } from "@/store/useSessionStore"


const ListInstances = () => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion, currentProfile, currentStack } = getSessionData();

    const { data, isLoading } = useGetEc2InstancesQuery();


    return (
        <div>
            <DataTableInstance
                isQueryLoading={isLoading}
                columns={columns}
                data={data || []}
                awsRegion={currentAwsRegion}
                linkAwsConsole={`https://console.aws.amazon.com/ec2/home?region=${currentAwsRegion}#Instances:v=3`}
                awsProfile={currentProfile || ''}
                currentStack={currentStack || ''}
            />
        </div>
    )
}

export default ListInstances