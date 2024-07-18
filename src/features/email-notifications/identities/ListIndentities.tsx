import useGetSesIdentitiesQuery from '@/react-query-utils/queries/ses-queries/useGetSesIdentitiesQuery';
import { useUserSessionStore } from '@/store/useSessionStore';
import { DataTableSes } from './data-table-ses/DataTableSes';
import { columns } from './data-table-ses/columns';

const ListIndentities = () => {
    const { getSessionData } = useUserSessionStore();
    const { currentProfile, currentAwsRegion } = getSessionData();

    const { data, isLoading } = useGetSesIdentitiesQuery()

    // console.log('data', data)
    return (
        <div>
            <DataTableSes
                isQueryLoading={isLoading}
                columns={columns}
                data={data || []}
                awsRegion={currentAwsRegion}
                awsProfile={currentProfile!}
            />
        </div>
    )
}

export default ListIndentities