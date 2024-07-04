import useGetJobDefinitionsQuery from '@/react-query-utils/queries/job-batch-queries/useGetJobDefinitionsQuery';
import { DataTableJobDefinition } from './DataTableJobDefinition';
import { columns } from './columns';
import { useUserSessionStore } from '@/store/useSessionStore';

const JobDefinitionSection = () => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion, currentProfile, currentStack }  = getSessionData();

    const { data, isLoading } = useGetJobDefinitionsQuery({ enabled: true });

    return (
        <>
            <DataTableJobDefinition
                isQueryLoading={isLoading}
                data={data || []}
                columns={columns}
                awsProfile={currentProfile!}
                awsRegion={currentAwsRegion}
                currentStack={currentStack!}
                linkAwsConsole={`https://${currentAwsRegion}.console.aws.amazon.com/batch/home?region=${currentAwsRegion}#job-definition`}
            />
        </>
    )
}

export default JobDefinitionSection