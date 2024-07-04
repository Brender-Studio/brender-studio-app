import CustomTabs from '@/components/custom/tabs/CustomTabs';
import GpuListQuotas from './gpu-quotas/list-quotas/GpuListQuotas';
import RequestHistory from './gpu-quotas/quota-request-history/RequestHistory';
import CpuListQuotas from './cpu-quotas/CpuListQuotas';


const ServiceQuotaSection = () => {

    const tabs = [
        { value: "gpu-service-quotas", label: "GPU Service Quotas", content: <GpuListQuotas /> },
        { value: "cpu-service-quotas", label: "CPU Service Quotas", content: <CpuListQuotas /> },
        { value: "request-history", label: "Quota Request History", content: <RequestHistory />}
    ];

    return (
        <div>
            <CustomTabs tabs={tabs} />
        </div>
    )
}

export default ServiceQuotaSection