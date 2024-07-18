import { useUserSessionStore } from '@/store/useSessionStore';
import { DataTableSesTemplates } from './data-table-ses-templates/DataTableSesTemplates';
import { columns } from './data-table-ses-templates/columns';
import useGetSesTemplatesQuery from '@/react-query-utils/queries/ses-queries/useGetSesTemplatesQuery';

const ListTemplates = () => {
    const { getSessionData } = useUserSessionStore();
    const { currentProfile, currentAwsRegion } = getSessionData();

    const { data, isLoading } = useGetSesTemplatesQuery()

    return (
        <div>
            <DataTableSesTemplates
                isQueryLoading={isLoading}
                columns={columns}
                data={data || []}
                awsRegion={currentAwsRegion}
                awsProfile={currentProfile!}
            />
        </div>
    )
}

export default ListTemplates