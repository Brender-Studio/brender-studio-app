import { useUserSessionStore } from '@/store/useSessionStore';
import { columns } from './columns';
import { DataTableServiceQuota } from './DataTableServiceQuota';
import useGetServiceQuotaGpuQuery from '@/react-query-utils/queries/service-quota-queries/useGetServiceQuotaGpuQuery';

const GpuListQuotas = () => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion } = getSessionData();

    const { data, isLoading } = useGetServiceQuotaGpuQuery();


    return (
        <div>
            <DataTableServiceQuota
                isQueryLoading={isLoading}
                title="Service Quotas for G EC2 Instances"
                description={`Maximum number of resources that you can create in your AWS account. They are also referred to as limits.`}
                data={data || []}
                columns={columns}
                linkAwsConsole={`https://${currentAwsRegion}.console.aws.amazon.com/servicequotas/home/services/ec2/quotas/`}
            />
        </div>
    )
}

export default GpuListQuotas