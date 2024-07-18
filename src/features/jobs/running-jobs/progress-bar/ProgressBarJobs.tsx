import useJobProgress from '@/react-query-utils/queries/job-batch-queries/useJobProgress';

interface ProgressBarJobsProps {
    job3Id: string;
    job3Status: string;
    dependsOn: string;
    projectName: string;
}

const ProgressBarJobs = ({ job3Id }: ProgressBarJobsProps) => {

    const { data: progress = 5, isLoading } = useJobProgress(job3Id);

    // console.log('progress', progress, isLoading)

    return (

        <div className="relative h-1 rounded-full bg-brand/20 overflow-hidden">
            {isLoading ? <div className="absolute top-0 -left-20 right-0 h-full bg-brand animate-progress w-full"></div> :
                <div className="absolute top-0 left-0 right-0 h-full bg-brand animate-pulse transition-all" style={{ width: `${progress}%` }}></div>
            }
        </div>

    )
}

export default ProgressBarJobs;
