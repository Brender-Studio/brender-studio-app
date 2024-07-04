import { ColumnDef } from "@tanstack/react-table";
import ProgressBarJobs from "../progress-bar/ProgressBarJobs";
import ButtonTerminateJobs from "../terminate-jobs/ButtonTerminateJobs";

// crear los tipos de datos para los trabajos en ejecución segun ejemplo de arriba
// projecrtName es el env de bucketkey por ejemplo
export type RunningJob = {
    projectName: string; // Se obtiene de env.BUCKET_KEY
    queueType: string; // Se obtiene de jobQueue (ejemplo: "spot" o "on-demand")
    createdAt: string; // Se obtiene de createdAt
    computeType: string; // Se obtiene de jobDefinition (ejemplo: "gpu" o "cpu")
    job3Id: string; // Se obtiene de job3Id
    job3Status: string; // Se obtiene de job3Status
    dependsOn: string; // Se obtiene de dependsOn
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
            // 2024-05-30T17:09:03.461Z
            // convert timestamp to date
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
                    {/* TODO: CUSTOM PROGRESS BAR (job id prop needed) */}
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