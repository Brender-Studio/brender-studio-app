import { Card, CardContent } from "@/components/ui/card"
import { useUserSessionStore } from "@/store/useSessionStore";
import { DataTableSes } from "./data-table-ses/DataTableSes";
import { columns } from "./data-table-ses/columns";
import useGetSesIdentitiesQuery from "@/react-query-utils/queries/ses-queries/useGetSesIdentitiesQuery";
import CardSkeleton from "@/components/custom/skeletons/CardSkeleton";

const SesSection = () => {
    const { getSessionData } = useUserSessionStore();
    const { currentProfile, currentAwsRegion } = getSessionData();

    const { data, isLoading } = useGetSesIdentitiesQuery()

    // console.log('data', data)

    return (
        <div>
            <Card>
                <CardContent>
                    {isLoading ? (
                        <div className="pt-6">
                            <CardSkeleton />
                        </div>
                    ) : (
                        <DataTableSes
                            columns={columns}
                            data={data || []}
                            awsRegion={currentAwsRegion}
                            awsProfile={currentProfile!}
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default SesSection