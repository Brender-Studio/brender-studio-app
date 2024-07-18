import useGetJobExecutionQuery from "@/react-query-utils/queries/job-batch-queries/useGetJobExecutionQuery"
import { DataTableJobsOverview } from "./list-job-overview/DataTableJobsOverview"
import { columns } from "./list-job-overview/columns"
import { useUserSessionStore } from "@/store/useSessionStore"
import { ColumnDef } from "@tanstack/react-table"

interface ColumnsProps {
    jobQueueName: string;
    jobQueueArn: string;
    statusCounts: { [status: string]: number; };
}

const JobQueuesSection = () => {
    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentAwsRegion, currentProfile, currentStack } = sessionData;

    const { data, isLoading } = useGetJobExecutionQuery()

    // console.log('Data from job queues', data)
    return (
        <div>
            <DataTableJobsOverview
                isQueryLoading={isLoading}
                data={data || []}
                columns={columns as ColumnDef<ColumnsProps, unknown>[]}
                awsProfile={currentProfile!}
                awsRegion={currentAwsRegion}
                currentStack={currentStack!}
                linkAwsConsole={`https://${currentAwsRegion}.console.aws.amazon.com/batch/home?region=${currentAwsRegion}#dashboard`}
            />
        </div>
    )
}

export default JobQueuesSection