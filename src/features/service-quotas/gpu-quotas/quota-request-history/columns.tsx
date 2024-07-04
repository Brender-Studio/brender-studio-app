import { ColumnDef } from "@tanstack/react-table";
import { open } from "@tauri-apps/api/shell";


export type QuotaRequestHistory = {
    Id: string;
    CaseId: string;
    ServiceCode: string;
    ServiceName: string;
    QuotaCode: string;
    QuotaName: string;
    DesiredValue: number;
    Status: string;
    Created: string;
    LastUpdated: string;
    Requester: string;
    QuotaArn: string;
    GlobalQuota: boolean;
    Unit: string;
    QuotaRequestedAtLevel: string;
};


export const columns: ColumnDef<QuotaRequestHistory>[] = [
    {
        id: "CaseId",
        header: "Case Id",
        cell: ({ row }) => {
            const openUrl = () => {
                const caseId = row.original.CaseId;
                const url = `https://support.console.aws.amazon.com/support/home#/case/?displayId=${caseId}`;
                open(url);
            };
            return (
                <div
                    onClick={() => openUrl()}
                    className="text-blue-500 hover:underline cursor-pointer font-semibold"
                >
                    <span>
                        {row.original.CaseId}
                    </span>
                </div>
            );
        }
    },
    {
        id: "QuotaName",
        header: "Quota Name",
        cell: ({ row }) => {
            return (
                <span title={row.original.QuotaName} >
                    {row.original.QuotaName}
                </span>
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
        id: "DesiredValue",
        header: "Desired Value",
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.DesiredValue}
                </span>
            );
        }
    },
    {
        id: "Status",
        header: "Status",
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.Status}
                </span>
            );
        }
    },
    {
        id: "Created",
        header: "Created",
        cell: ({ row }) => {
            const date = new Date(row.original.Created);
            return (
                <span>
                    {date.toLocaleString()}
                </span>
            );
        }
    },
    {
        id: "LastUpdated",
        header: "Last Updated",
        cell: ({ row }) => {
            const date = new Date(row.original.LastUpdated);
            return (
                <span>
                    {date.toLocaleString()}
                </span>
            );
        }
    },
];
