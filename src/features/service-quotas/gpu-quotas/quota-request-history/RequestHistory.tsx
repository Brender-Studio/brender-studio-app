import { useUserSessionStore } from "@/store/useSessionStore";
import { columns } from "./columns"
import { DataTableRequestHistory } from "./DataTableRequestHistory"
import useGetRequestHistoryQuery from "@/react-query-utils/queries/service-quota-queries/useGetRequestHistoryQuery";

const RequestHistory = () => {
  const { currentAwsRegion, currentProfile } = useUserSessionStore().getSessionData();

  const { data, isLoading } = useGetRequestHistoryQuery()

  return (
    <div>
      <DataTableRequestHistory
        isQueryLoading={isLoading}
        data={data || []}
        columns={columns}
        awsRegion={currentAwsRegion!}
        awsProfile={currentProfile!}
        linkAwsConsole={`https://${currentAwsRegion}.console.aws.amazon.com/servicequotas/home/requests`}
      />
    </div>
  )
}

export default RequestHistory