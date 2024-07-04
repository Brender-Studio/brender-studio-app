import { useEffect, useState } from 'react'
import { DataTableRunningJobs } from './table-running-jobs/DataTableRunningJobs'
import { useUserSessionStore } from '@/store/useSessionStore'
import { columns, RunningJob } from './table-running-jobs/columns'
import { mapToRunningJob } from './table-running-jobs/utils'
import useJobExecutionsQuery from '@/react-query-utils/queries/job-batch-queries/useJobExecutionQuery'

const RunningJobsSection = () => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion, currentProfile, currentStack } = getSessionData();
    const [runningJobs, setRunningJobs] = useState<RunningJob[]>([]);

    const { data, isLoading } = useJobExecutionsQuery();

    useEffect(() => {
        if (!isLoading && data && data.length) {
            const mappedJobs = data.map(mapToRunningJob);
            setRunningJobs(mappedJobs);
        } else {
            setRunningJobs([]);
        }
    }, [data, isLoading]);


    return (
        <div>
            <DataTableRunningJobs
                isQueryLoading={isLoading}
                data={runningJobs || []}
                columns={columns as any}
                awsProfile={currentProfile!}
                awsRegion={currentAwsRegion}
                currentStack={currentStack!}
                linkAwsConsole={`https://${currentAwsRegion}.console.aws.amazon.com/batch/home?region=${currentAwsRegion}#dashboard`}
            />
        </div>
    )
}

export default RunningJobsSection