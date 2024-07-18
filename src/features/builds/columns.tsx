import SpinnerButton from "@/components/custom/spinners/SpinnerButton";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { open } from "@tauri-apps/api/shell";

export type CodeBuild = {
    id: string;
    projectName: string;
    buildStatus: string;
    startTime: string;
    endTime: string;
    buildDuration: string;
    logs: {
        deepLink: string;
    }
};

export const columns: ColumnDef<CodeBuild>[] = [
    {
        id: "projectName",
        header: "Project Name",
        cell: ({ row }) => row.original.projectName,
    },
    {
        id: "buildStatus",
        header: "Build Status",
        cell: ({ row }) => {
            // Show spinner if build is in progress
            if (row.original.buildStatus === "IN_PROGRESS") {
                return (
                    <div className="flex items-center">
                        <SpinnerButton />
                        <p className="ml-2 font-semibold">
                            {row.original.buildStatus}
                        </p>
                    </div>
                );
            } else if (row.original.buildStatus === "SUCCEEDED") {
                return (
                    <p className="font-semibold text-green-500">{row.original.buildStatus}</p>
                );
            } else if (row.original.buildStatus === "FAILED") {
                return (
                    <p className="font-semibold text-red-500">{row.original.buildStatus}</p>
                );
            }
            else {
                return row.original.buildStatus;
            }
        },
    },
    {
        id: "startTime",
        header: "Build Start",
        cell: ({ row }) => {
            const date = new Date(row.original.startTime);
            return date.toLocaleString();
        }
    },
    {
        id: "endTime",
        header: "Build End",
        cell: ({ row }) => {
            // format in date and minutes
            const date = new Date(row.original.endTime);
            // CHECK IF DATE IS VALID , IF NOT RETURN '-'
            if (isNaN(date.getTime())) {
                return '-';
            }
            return date.toLocaleString();
        }
    },
    {
        id: "buildDuration",
        header: "Build Duration",
        cell: ({ row }) => {
            // format in minutes with start and end time
            const start = new Date(row.original.startTime);
            const end = new Date(row.original.endTime);
            const duration = end.getTime() - start.getTime();
            const minutes = Math.floor(duration / 60000);
            // CHECK IF DATE IS VALID , IF NOT RETURN '-'
            if (isNaN(minutes)) {
                return '-';
            }
            return minutes + " minutes";
        }
    },
    {
        id: "logs",
        header: "Build Logs",
        cell: ({ row }) => {

            return (
                <Button
                    onClick={() => open(row.original.logs.deepLink)}
                    className="text-blue-500"
                    variant='link'
                >
                    View Logs
                </Button>
            );
        }
    }

];
