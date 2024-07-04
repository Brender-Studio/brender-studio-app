import { DataTableEcr } from "./DataTableEcr"
import { columns } from "./columns"
import { useUserSessionStore } from "@/store/useSessionStore"
import useEcrImagesQuery from "@/react-query-utils/queries/ecr-queries/useEcrImagesQuery"

const ListEcrImages = () => {
    const { getSessionData } = useUserSessionStore();
    const { currentProfile, currentAwsRegion } = getSessionData();

    const { data, isLoading } = useEcrImagesQuery()


    const awsConsoleLinkECR = `https://${currentAwsRegion}.console.aws.amazon.com/ecr/repositories/blender-repo-ecr/?region=${currentAwsRegion}`


    return (
        <div className="py-6">
            <DataTableEcr
                columns={columns}
                data={data ? data.imageDetails : []}
                linkAwsConsole={awsConsoleLinkECR}
                awsRegion={currentAwsRegion!}
                awsProfile={currentProfile!}
                isQueryLoading={isLoading}
            />
        </div>
    )
}

export default ListEcrImages