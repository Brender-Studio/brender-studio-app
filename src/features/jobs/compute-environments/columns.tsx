import { ColumnDef } from "@tanstack/react-table";
import { open } from "@tauri-apps/api/shell";


export type ComputeEnv = {
    computeEnvironmentName: string;
    computeEnvironmentArn: string;
    computeResources: {
        type: string;
        minvCpus: number;
        maxvCpus: number;
        instanceTypes: string[];
        bidPercentage: number;
        allocationStrategy: string;
    };
    state: string;
    status: string;
    // statusReason: string;
    type: string;
};

export const columns: ColumnDef<ComputeEnv>[] = [
    {
        id: "computeEnvironmentName",
        header: "CE Name",
        cell: ({ row }) => {
            const openUrl = (id: string) => {
                // extrer region from arn
                const region = id.split(':')[3];
                console.log('region', region)
                const url = `https://${region}.console.aws.amazon.com/batch/home?region=${region}#compute-environments/detail/${id}`;
                open(url);
            };

            return (
                <div
                    onClick={() => openUrl(row.original.computeEnvironmentArn)}
                    className="text-blue-500 hover:underline cursor-pointer font-semibold"
                    style={{ wordBreak: 'break-all' }}
                >
                    <span title={row.original.computeEnvironmentName} >
                        {row.original.computeEnvironmentName}
                    </span>
                </div>
            );
        }
    },
    // Instance types
    {
        id: "instanceTypes",
        header: "Instance Types",
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.computeResources.instanceTypes.join(', ')}
                </span>
            );
        }
    },
    // ec2 type
    {
        id: "computeResourcesType",
        header: "Type",
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.computeResources.type}
                </span>
            );
        }
    },
    // ALLOCAtion strategy
    {
        id: "allocationStrategy",
        header: "Allocation Strategy",
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.computeResources.allocationStrategy}
                </span>
            );
        }
    },
    // bidPercentage
    {
        id: "bidPercentage",
        header: "Bid Percentage",
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.computeResources.bidPercentage ? row.original.computeResources.bidPercentage : '-'}
                </span>
            );
        }
    },
    {
        id: "state",
        header: "State",
        cell: ({ row }) => {
            return (
                <span title={row.original.state}>
                    {row.original.state}
                </span>
            );
        }
    },
    // min and max vCpus
    {
        id: "computeResources",
        header: "VCPUs",
        cell: ({ row }) => {
            return (
                <span className="truncate">
                    {row.original.computeResources.minvCpus} - {row.original.computeResources.maxvCpus}
                </span>
            );
        }
    },
    {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.status}
                </span>
            );
        }
    },
];