import { ColumnDef } from "@tanstack/react-table";
import { open } from "@tauri-apps/api/shell";
import { Checkbox } from "@/components/ui/checkbox";
import ArrayProperties from "./array-properties/ArrayProperties";

export type JobStatusByQueue = {
    jobArn: string
    jobName: string
    jobId: string
    createdAt: string
    startedAt: string
    // stoppedAt: string
    status: string
    statusReason: string
    arrayProperties: {
        size: number
    }
}

export const columns: ColumnDef<JobStatusByQueue>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    {
        id: "jobName",
        header: "Job Name",
        cell: ({ row }) => {
            // EXTRACT REGION FROM ARN
            const region = row.original.jobArn.split(':')[3];
            console.log('region', region)
            // https://us-east-1.console.aws.amazon.com/batch/home?region=us-east-1#jobs/ec2/detail/41784672-c3ad-439e-8543-4bd6c9cb265a
            const openUrl = (id: string) => {
                const url = `https://${region}.console.aws.amazon.com/batch/home?region=${region}#jobs/ec2/detail/${id}`;
                open(url);
            };

            return (
                <div
                    onClick={() => openUrl(row.original.jobId)}
                    className="text-blue-500 hover:underline cursor-pointer font-semibold"
                    // style={{wordBreak: 'break-all'}}
                >
                    <span title={row.original.jobName} >
                        {row.original.jobName}
                    </span>
                </div>
            )
        },
    },
    {
        id: "jobId",
        header: "Job Id",
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.jobId}
                </span>
            )
        },
    },
    {
        id: "arrayProperties",
        header: "Array Size",
        cell: ({ row }) => {
            return (
                <ArrayProperties jobId={row.original.jobId} />
            )
        },
    },
    {
        id: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const createdAt = parseInt(row.original.createdAt);

            // convert timestamp to date
            const date = new Date(createdAt);

            if (isNaN(createdAt)) {
                return <span>-</span>;
            }

            return (
                <span>
                    {date.toLocaleString()}
                </span>
            )
        },
    },
    {
        id: "startedAt",
        header: "Started At",
        cell: ({ row }) => {
            const startedAt = parseInt(row.original.startedAt);

            // convert timestamp to date
            const date = new Date(startedAt);


            if (isNaN(startedAt)) {
                return <span>-</span>;
            }

            return (
                <span>
                    {date.toLocaleString()}
                </span>
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
        id: "statusReason",
        header: "Status Reason",
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.statusReason ? row.original.statusReason : '-'}
                </span>
            )
        },
    },
];