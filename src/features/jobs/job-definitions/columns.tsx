import { ColumnDef } from "@tanstack/react-table";
import { open } from "@tauri-apps/api/shell";

export type JobDefinition = {
    jobDefinitionName: string;
    jobDefinitionArn: string;
    status: string;
    containerOrchestrationType: string;
    containerProperties: {
        image: string;
        mountPoints: { containerPath: string, sourceVolume: string }[];
        resourceRequirements: { type: string, value: number }[];
    };
    retryStrategy: {
        attempts: number;
        evaluateOnExit: string[];
    };
    timeout: {
        attemptDurationSeconds: number;
    };
};



export const columns: ColumnDef<JobDefinition>[] = [
    {
        id: "jobDefinitionName",
        header: "Job Definition Name",
        cell: ({ row }) => {
            const openUrl = (id: string) => {
                // Extract region from arn
                const region = id.split(':')[3];
                console.log('region', region)
                const url = `https://${region}.console.aws.amazon.com/batch/home?region=${region}#job-definition/ec2/detail/${id}`;
                open(url);
            };

            return (
                <div
                    onClick={() => openUrl(row.original.jobDefinitionArn)}
                    className="text-blue-500 hover:underline cursor-pointer font-semibold"
                >
                    <span title={row.original.jobDefinitionName}>
                        {row.original.jobDefinitionName}
                    </span>
                </div>
            )
        },
    },
    {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.status}
                </span>
            )
        },
    },
    {
        id: "image",
        header: "Image",
        cell: ({ row }) => {
            const id = row.original.containerProperties.image.split('/')[1];
            return (
                <span>{id}</span>
            )
        },
    },
    {
        id: "vcpus",
        header: "VCPUs",
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.containerProperties.resourceRequirements[1].value}
                </span>
            )
        },
    },
    {
        id: "memory",
        header: "Memory",
        cell: ({ row }) => {
            // convert to GB
            const memory = row.original.containerProperties.resourceRequirements[0].value / 1024;
            return (
                <span>
                    {memory} GB
                </span>
            )
        },
    },
    {
        id: "efs",
        header: "EFS",
        cell: ({ row }) => {
            const efs = row.original.containerProperties.mountPoints[0].containerPath;
            return (
                <span>
                    {efs}
                </span>
            )
        },
    },
    {
        id: "retryStrategy",
        header: "Retries",
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.retryStrategy.attempts}
                </span>
            )
        },
    },
    {
        id: "timeout",
        header: "Timeout",
        cell: ({ row }) => {
            // convert to minutes
            const timeout = row.original.timeout.attemptDurationSeconds / 60;
            return (
                <span>
                    {timeout} minutes
                </span>
            )
        },
    }
];