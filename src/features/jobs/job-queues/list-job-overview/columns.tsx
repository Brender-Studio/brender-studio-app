import { ColumnDef } from "@tanstack/react-table";
import { open } from "@tauri-apps/api/shell";
import JobStatusDialog from "./job-status-dialog/JobStatusDialog";
import { useState } from "react";

export type JobQueueStatus = {
    jobQueueName: string;
    jobQueueArn: string;
    statusCounts: {
        SUBMITTED: number;
        PENDING: number;
        RUNNABLE: number;
        STARTING: number;
        RUNNING: number;
        SUCCEEDED: number;
        FAILED: number;
    };
};

export const columns: ColumnDef<JobQueueStatus, unknown>[] = [
    {
        id: "jobQueueName",
        header: "Job Queue Name",
        cell: ({ row }) => {
            const openUrl = (id: string) => {
                // extrer region from arn
                const region = id.split(':')[3];
                console.log('region', region)
                const url = `https://${region}.console.aws.amazon.com/batch/home?region=${region}#queues/detail/${id}`;
                open(url);
            };

            return (
                <div
                    onClick={() => openUrl(row.original.jobQueueArn)}
                    className="text-blue-500 hover:underline cursor-pointer font-semibold"
                    style={{ wordBreak: 'break-all' }}
                >
                    <span title={row.original.jobQueueName}>
                        {row.original.jobQueueName}
                    </span>
                </div>
            )
        },
    },
    {
        id: "SUBMITTED",
        header: "SUBMITTED",
        cell: ({ row }) => {
            const [openDialog, setOpenDialog] = useState(false);
            return (
                <JobStatusDialog
                    title={row.original.jobQueueName}
                    description="SUBMITTED"
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    totalJobNumber={row.original.statusCounts.SUBMITTED}
                    jobQueueName={row.original.jobQueueName}
                    jobStatus="SUBMITTED"
                />
            )
        },
    },
    {
        id: "PENDING",
        header: "PENDING",
        cell: ({ row }) => {
            const [openDialog, setOpenDialog] = useState(false);
            return (
                <JobStatusDialog
                    title={row.original.jobQueueName}
                    description="PENDING"
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    totalJobNumber={row.original.statusCounts.PENDING}
                    jobQueueName={row.original.jobQueueName}
                    jobStatus="PENDING"
                />
            )
        },
    },
    {
        id: "RUNNABLE",
        header: "RUNNABLE",
        cell: ({ row }) => {
            // here job status dialog to manage the job states (terminate, cancel, etc.)
            const [openDialog, setOpenDialog] = useState(false);
            return (
                <JobStatusDialog
                    title={row.original.jobQueueName}
                    description="RUNNABLE"
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    totalJobNumber={row.original.statusCounts.RUNNABLE}
                    jobQueueName={row.original.jobQueueName}
                    jobStatus="RUNNABLE"
                />
            )
        },
    },
    {
        id: "STARTING",
        header: "STARTING",
        cell: ({ row }) => {
            const [openDialog, setOpenDialog] = useState(false);
            return (
                <JobStatusDialog
                    title={row.original.jobQueueName}
                    description="STARTING"
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    totalJobNumber={row.original.statusCounts.STARTING}
                    jobQueueName={row.original.jobQueueName}
                    jobStatus="STARTING"
                />
            )
        },
    },
    {
        id: "RUNNING",
        header: "RUNNING",
        cell: ({ row }) => {
            const [openDialog, setOpenDialog] = useState(false);
            return (
                <JobStatusDialog
                    title={row.original.jobQueueName}
                    description="RUNNING"
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    totalJobNumber={row.original.statusCounts.RUNNING}
                    jobQueueName={row.original.jobQueueName}
                    jobStatus="RUNNING"
                />
            )
        },
    },
    {
        id: "SUCCEEDED",
        header: "SUCCEEDED",
        cell: ({ row }) => {
            const [openDialog, setOpenDialog] = useState(false);

            return (
                <JobStatusDialog
                    title={row.original.jobQueueName}
                    description="SUCCEEDED"
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    totalJobNumber={row.original.statusCounts.SUCCEEDED}
                    jobQueueName={row.original.jobQueueName}
                    jobStatus="SUCCEEDED"
                />
            )
        },
    },
    {
        id: "FAILED",
        header: "FAILED",
        cell: ({ row }) => {
            const [openDialog, setOpenDialog] = useState(false);
            return (
                <JobStatusDialog
                    title={row.original.jobQueueName}
                    description="FAILED"
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    totalJobNumber={row.original.statusCounts.FAILED}
                    jobQueueName={row.original.jobQueueName}
                    jobStatus="FAILED"
                />
            )
        },
    },

];