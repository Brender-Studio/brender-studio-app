import DataTableHeader from "@/components/custom/structure/DataTableHeader";
import LabelSeparator from "@/components/custom/structure/LabelSeparator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useGetServiceQuotaGpuQuery from "@/react-query-utils/queries/service-quota-queries/useGetServiceQuotaGpuQuery";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QuotaData } from "./quota-types";

interface GpuQuotaProps {
    setGpuQuotas: (gpuQuotas: { spot: number, onDemand: number }) => void;
}

const GpuQuota = ({ setGpuQuotas }: GpuQuotaProps) => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion } = getSessionData();
    const navigate = useNavigate();

    // "Running On-Demand G and VT instances"
    // "Running Spot G and VT instances"

    const { data, isLoading } = useGetServiceQuotaGpuQuery();

    console.log('data: ', data)

    useEffect(() => {
        if (data) {
            const spot = data?.find((item: QuotaData) => item.QuotaName === 'All G and VT Spot Instance Requests')
            const onDemand = data?.find((item: QuotaData) => item.QuotaName === 'Running On-Demand G and VT instances')

            setGpuQuotas({
                spot: spot?.Value,
                onDemand: onDemand?.Value
            })
        }
    }, [data])




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
                            <LabelSeparator label="GPU EC2 Quotas" my={4} />
                        </div>
                        <div className="flex justify-between items-center">
                            <DataTableHeader
                                title="Service Quotas"
                                description={`Service Quotas for GPU EC2 in ${currentAwsRegion} region.`}
                            />
                            <Button size='sm' variant='secondary' type="button" onClick={() => navigate(`/service-quotas`)}>
                                Request Quota Increase
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2 items-center">
                            {data?.map((item: QuotaData) => (
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

export default GpuQuota