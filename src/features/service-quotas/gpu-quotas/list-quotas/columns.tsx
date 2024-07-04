import { ColumnDef } from "@tanstack/react-table";
import { open } from "@tauri-apps/api/shell";
import RequestQuotaDialog from "./request-quota-dialog/RequestQuotaDialog";
import { useState } from "react";

export type ServiceQuota = {
    ServiceCode: string;
    ServiceName: string;
    QuotaArn: string;
    QuotaName: string;
    QuotaCode: string;
    Value: number;
    // Unit: string;
    Adjustable: boolean;
    GlobalQuota: boolean;
    // RequestQuotaDialog: string;
    UsageMetric: {
        MetricNamespace: string;
        MetricName: string;
        MetricDimensions: {
            Class: string;
            Resource: string;
            Service: string;
            Type: string;
        };
        MetricStatisticRecommendation: string;
    };
};

export const columns: ColumnDef<ServiceQuota>[] = [
    {
        id: "QuotaName",
        header: "Quota Name",
        cell: ({ row }) => {
            const openUrl = (id: string) => {
                // extract region from arn and quota code
                // example url: https://us-east-1.console.aws.amazon.com/servicequotas/home/services/ec2/quotas/L-3819A6DF
                const region = id.split(':')[3];
                const quotaCode = row.original.QuotaCode;

                const url = `https://${region}.console.aws.amazon.com/servicequotas/home/services/ec2/quotas/${quotaCode}`;
                open(url);
            };

            return (
                <div
                    onClick={() => openUrl(row.original.QuotaArn)}
                    className="text-blue-500 hover:underline cursor-pointer font-semibold"
                >
                    <span title={row.original.QuotaName} >
                        {row.original.QuotaName}
                    </span>
                </div>
            );
        }
    },
    {
        id: "QuotaCode",
        header: "Quota Code",
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.QuotaCode}
                </span>
            );
        }
    },
    {
        id: "Value",
        header: "Value",
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.Value}
                </span>
            );
        }
    },
    {
        id: "Class",
        header: "Class",
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.UsageMetric.MetricDimensions.Class}
                </span>
            );
        }
    },

    {
        id: "RequestQuotaDialog",
        header: "Request Quota",
        cell: ({ row }) => {
            const [openDialog, setOpenDialog] = useState(false);

            return (
                <div>
                    <RequestQuotaDialog
                        openDialog={openDialog}
                        setOpenDialog={setOpenDialog}
                        quotaName={row.original.QuotaName}
                        serviceCode={row.original.ServiceCode}
                        currentQuota={row.original.Value.toString()}
                        quotaCode={row.original.QuotaCode}
                    />
                </div>
            );
        }
    }
];