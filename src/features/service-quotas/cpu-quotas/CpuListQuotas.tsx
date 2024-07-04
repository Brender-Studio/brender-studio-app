import useGetServiceQuotaCpuQuery from '@/react-query-utils/queries/service-quota-queries/useGetServiceQuotaCpuQuery';
import { useUserSessionStore } from '@/store/useSessionStore';
import { DataTableServiceQuota } from '../gpu-quotas/list-quotas/DataTableServiceQuota';
import { columns } from '../gpu-quotas/list-quotas/columns';

const CpuListQuotas = () => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion } = getSessionData();

    const { data, isLoading } = useGetServiceQuotaCpuQuery();

    return (
        <div>
            <DataTableServiceQuota
                isQueryLoading={isLoading}
                title="Service Quotas for CPU EC2 Instances"
                description={`Maximum number of resources that you can create in your AWS account. They are also referred to as limits.`}
                data={data || []}
                columns={columns}
                linkAwsConsole={`https://${currentAwsRegion}.console.aws.amazon.com/servicequotas/home/services/ec2/quotas/`}
            />
        </div>
    )
}

export default CpuListQuotas