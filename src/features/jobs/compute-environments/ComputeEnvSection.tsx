import useGetComputeEnvQuery from "@/react-query-utils/queries/job-batch-queries/useGetComputeEnvQuery";
import { DataTableComputeEnv } from "./DataTableComputeEnv";
import { columns } from "./columns";
import { useUserSessionStore } from "@/store/useSessionStore";

const ComputeEnvSection = () => {
    //   const { currentAwsRegion, currentProfile, currentStack } = useUserSessionStore()
    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentAwsRegion, currentProfile, currentStack } = sessionData;

    const { data, isLoading } = useGetComputeEnvQuery();

    console.log('data from useGetComputeEnvQuery', data)

    return (
        <>
            <DataTableComputeEnv
                isQueryLoading={isLoading}
                data={data || []}
                columns={columns}
                awsProfile={currentProfile!}
                awsRegion={currentAwsRegion}
                currentStack={currentStack!}
                linkAwsConsole={`https://${currentAwsRegion}.console.aws.amazon.com/batch/home?region=${currentAwsRegion}#compute-environments`}
            />
        </>
    )
}

export default ComputeEnvSection