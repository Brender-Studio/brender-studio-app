import CustomTabs from '@/components/custom/tabs/CustomTabs'
import JobQueuesSection from './job-queues/JobQueuesSection';
import JobDefinitionSection from './job-definitions/JobDefinitionSection';
import ComputeEnvSection from './compute-environments/ComputeEnvSection';
import RunningJobsSection from './running-jobs/RunningJobsSection';

const JobSection = () => {
    const tabs = [
        { value: "running-jobs", label: "Running Jobs", content: <RunningJobsSection />},
        { value: "job-queues", label: "Job Queues", content: <JobQueuesSection /> },
        { value: "job-definition", label: "Job Definitions", content: <JobDefinitionSection /> },
        { value: "compute-environments", label: "Compute Environments", content: <ComputeEnvSection /> }
    ];

    return (
        <div>
            <CustomTabs tabs={tabs} />
        </div>
    )
}

export default JobSection