import { useUserSessionStore } from "@/store/useSessionStore"
import { columns } from "./columns"
import { DataTableJobStatus } from "./DataTableJobStatus"
import useGetJobsByStatusQuery from "@/react-query-utils/queries/job-batch-queries/useGetJobsByStatusQuery"

interface ListJobStatusProps {
    jobQueueName: string
    jobStatus: string
}

const ListJobStatus = ({
    jobQueueName,
    jobStatus

}: ListJobStatusProps) => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion, currentProfile, currentStack } = getSessionData();

    const { data, isLoading } = useGetJobsByStatusQuery(jobQueueName, jobStatus)

    // console.log('Data from ListJobStatus', data)

    return (
        <div>
            <DataTableJobStatus
                isQueryLoading={isLoading}
                columns={columns}
                data={data || []}
                linkAwsConsole={`https://${currentAwsRegion}.console.aws.amazon.com/batch/home?region=${currentAwsRegion}#jobs`}
                awsRegion={currentAwsRegion}
                awsProfile={currentProfile || ''}
                currentStack={currentStack || ''}
                jobQueueName={jobQueueName}
                jobStatus={jobStatus}
            />
        </div>
    )
}

export default ListJobStatus