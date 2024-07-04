import { ColumnDef } from "@tanstack/react-table";

export type AutoscalingActivityLog = {
    status: string;
    description: string;
    cause: string;
    startTime: string;
    endTime: string;
    // statusMessage: string;
};

export const columns: ColumnDef<AutoscalingActivityLog>[] = [
    {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
            if (row.original.status === "Successful") {
                return (
                    <span className="text-green-500 font-semibold">
                        {row.original.status}
                    </span>
                )
            } else if (row.original.status === "Failed") {
                return (
                    <span className="text-red-500 font-semibold">
                        {row.original.status}
                    </span>
                )
            } else {
                return (
                    <span className="text-muted-foreground font-semibold">
                        {row.original.status}
                    </span>
                )
            }
        },
    },
    {
        id: "description",
        header: "Description",
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.description}
                </span>
            )
        },
    },
    {
        id: "cause",
        header: "Cause",
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.cause}
                </span>
            )
        },
    },
    {
        id: "startTime",
        header: "Start Time",
        cell: ({ row }) => {
            const date = new Date(row.original.startTime);
            return date.toLocaleString()
        },
    },
    {
        id: "endTime",
        header: "End Time",
        cell: ({ row }) => {
            const date = new Date(row.original.endTime);
            if (isNaN(date.getTime())) {
                return "-";
            }
            return date.toLocaleString();
        },
    }
];