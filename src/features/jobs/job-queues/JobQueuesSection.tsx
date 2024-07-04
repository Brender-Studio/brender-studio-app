import useGetJobExecutionQuery from "@/react-query-utils/queries/job-batch-queries/useGetJobExecutionQuery"
import { DataTableJobsOverview } from "./list-job-overview/DataTableJobsOverview"
import { columns } from "./list-job-overview/columns"
import { useUserSessionStore } from "@/store/useSessionStore"

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
                columns={columns as any} // TODO: Fix this
                awsProfile={currentProfile!}
                awsRegion={currentAwsRegion}
                currentStack={currentStack!}
                linkAwsConsole={`https://${currentAwsRegion}.console.aws.amazon.com/batch/home?region=${currentAwsRegion}#dashboard`}
            />
        </div>
    )
}

export default JobQueuesSection