import { ColumnDef } from "@tanstack/react-table";
import ProgressBarJobs from "../progress-bar/ProgressBarJobs";
import ButtonTerminateJobs from "../terminate-jobs/ButtonTerminateJobs";


export type RunningJob = {
    projectName: string; 
    queueType: string; 
    createdAt: string; 
    computeType: string; 
    job3Id: string; 
    job3Status: string; 
    dependsOn: string;
}

export const columns: ColumnDef<RunningJob>[] = [
    {
        id: "projectName",
        header: "Project Name",
        cell: ({ row }) => {
            return (
                <div
                    style={{ wordBreak: 'break-all' }}
                >
                    <span title={row.original.projectName}>
                        {row.original.projectName}
                    </span>
                </div>
            )
        },
    },
    {
        id: "queueType",
        header: "Queue Type",
        cell: ({ row }) => {
            return (
                <div
                    style={{ wordBreak: 'break-all' }}
                >
                    <span title={row.original.queueType}>
                        {row.original.queueType.toUpperCase()}
                    </span>
                </div>
            )
        },
    },
    {
        id: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const date = new Date(row.original.createdAt);

            return (
                <div
                    style={{ wordBreak: 'break-all' }}
                >
                    <span title={date.toLocaleString()}>
                        {date.toLocaleString()}
                    </span>
                </div>
            )
        },
    },
    {
        id: "computeType",
        header: "Compute Type",
        cell: ({ row }) => {
            return (
                <div
                    style={{ wordBreak: 'break-all' }}
                >
                    <span title={row.original.computeType}>
                        {row.original.computeType.toUpperCase()}
                    </span>
                </div>
            )
        },
    },
    {
        id: "progressbar",
        header: "Progress",
        cell: ({ row }) => {
            return (
                <div style={{ wordBreak: 'break-all' }} className="min-w-[150px]">
                    <ProgressBarJobs
                        job3Id={row.original.job3Id}
                        job3Status={row.original.job3Status}
                        dependsOn={row.original.dependsOn}
                        projectName={row.original.projectName}
                    />
                </div>
            )
        }
    },
    {
        id: "terminate",
        header: "Actions",
        cell: ({ row }) => {
            return (
                <div style={{ wordBreak: 'break-all' }}>
                    <ButtonTerminateJobs jobId3={row.original.job3Id} />
                </div>
            )
        },
    },
];