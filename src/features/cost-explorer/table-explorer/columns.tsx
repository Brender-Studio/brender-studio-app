import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { open } from "@tauri-apps/api/shell";
import { ColumnsTableExplorerProps } from "../costExplorerTypes";
import { nameMapping } from "@/lib/cost-explorer-utils/charts-utils/serviceColors";



export const columns: ColumnDef<ColumnsTableExplorerProps>[] = [
    {
        id: "Service",
        header: "Service",
        cell: ({ row }) => {
            const serviceName = row.original.Service;
            const displayName = nameMapping[serviceName] || serviceName;
            return displayName;
        }
    },
    {
        id: "Monthly",
        header: "Monthly",
        cell: ({ row }) => row.original.Monthly,
    },
    {
        id: "TotalCost",
        header: "Service in Total",
        cell: ({ row }) => ` ${row.original.Amount}$`,
    },
    {
        id: "Actions",
        header: "Actions",
        cell: ({ row }) => (
            <Button
                onClick={() => open(row.original.deepLink)}
                className="text-blue-500"
                variant="link"
            >
                View Details
            </Button>
        ),
    },
];


