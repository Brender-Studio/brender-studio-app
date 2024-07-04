import DataTableHeader from "@/components/custom/structure/DataTableHeader";
import LabelSeparator from "@/components/custom/structure/LabelSeparator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useGetServiceQuotaCpuQuery from "@/react-query-utils/queries/service-quota-queries/useGetServiceQuotaCpuQuery";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CpuQuotaProps {
    setCpuQuotas: (value: any) => void
}

const CpuQuota = ({ setCpuQuotas }: CpuQuotaProps) => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion } = getSessionData();
    const navigate = useNavigate();

    const { data, isLoading } = useGetServiceQuotaCpuQuery();

    // console.log('data: ', data)

    useEffect(() => {
        if (data) {
            const spot = data?.find((item: any) => item.QuotaName === 'All Standard (A, C, D, H, I, M, R, T, Z) Spot Instance Requests')
            const onDemand = data?.find((item: any) => item.QuotaName === 'Running On-Demand Standard (A, C, D, H, I, M, R, T, Z) instances')

            setCpuQuotas({
                spot: spot?.Value,
                onDemand: onDemand?.Value
            })
        }
    }, [data])


    const nameMapping: { [key: string]: string } = {
        'All Standard (A, C, D, H, I, M, R, T, Z) Spot Instance Requests': 'Standard Spot Instances',
        'Running On-Demand Standard (A, C, D, H, I, M, R, T, Z) instances': 'On-demand Standard Instances'
    };

    // Filtrar y mapear los datos para mostrar solo los ítems deseados con nombres simplificados
    const filteredData = data?.filter((item: any) =>
        item.QuotaName === 'All Standard (A, C, D, H, I, M, R, T, Z) Spot Instance Requests' ||
        item.QuotaName === 'Running On-Demand Standard (A, C, D, H, I, M, R, T, Z) instances'
    ).map((item: any) => ({
        ...item,
        QuotaName: nameMapping[item.QuotaName] || item.QuotaName
    }));


    return (
        <div className="col-span-6 pt-4">
            {
                isLoading ? (
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <div className="space-y-2">
                                <Skeleton className="h-8 w-40" />
                                <Skeleton className="h-8 w-72" />
                            </div>
                            <Skeleton className="h-8 w-40" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <Skeleton className="h-20" />
                            <Skeleton className="h-20" />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <LabelSeparator label="CPU EC2 Quotas" my={4} />
                        </div>
                        <div className="flex justify-between items-center">
                            <DataTableHeader
                                title="Service Quotas"
                                description={`Service Quotas for EC2 CPU based on the region ${currentAwsRegion}.`}
                            />
                            <Button size='sm' variant='secondary' type="button" onClick={() => navigate(`/service-quotas`)}>
                                Request Quota Increase
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2 items-center">
                            {filteredData?.map((item: any) => (
                                <Card key={item.QuotaCode} className="text-sm text-muted-foreground p-6">
                                    <div className="font-semibold text-white">{item.QuotaName}</div>
                                    <div className="text-sm">Current quota: {item.Value} (max vCPUs)</div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default CpuQuota