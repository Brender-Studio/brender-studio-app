import { formatSize } from "@/lib/formatSize";
import { ColumnDef } from "@tanstack/react-table";


export type EfsMeteredSizeData = {
    SizeInBytes: {
        Value: number;
        Timestamp: string;
        ValueInIA: number;
        ValueInStandard: number;
        ValueInArchive: number;
    };
};


export const columns: ColumnDef<EfsMeteredSizeData>[] = [
    {
        id: "Value",
        header: "Total Size",
        cell: ({ row }) => {
            const transformBytes = formatSize(row.original.SizeInBytes.Value);

            return <p>{transformBytes}</p>
        }

    },
    {
        id: "ValueInStandard",
        header: "Size in Standard",
        cell: ({ row }) => {
            // 12.00 KiB (100%)
            const transformBytes = formatSize(row.original.SizeInBytes.ValueInStandard);

            return <p>{transformBytes} ({row.original.SizeInBytes.ValueInStandard / row.original.SizeInBytes.Value * 100}%)</p>

        }
    },
    {
        id: "ValueInIA",
        header: "Size in IA",
        cell: ({ row }) => {
            // 12.00 KiB (100%)
            const transformBytes = formatSize(row.original.SizeInBytes.ValueInIA);

            return <p>{transformBytes} ({row.original.SizeInBytes.ValueInIA / row.original.SizeInBytes.Value * 100}%)</p>
        }
    },
    {
        id: "ValueInArchive",
        header: "Size in Archive",
        cell: ({ row }) => {
            // 12.00 KiB (100%)
            const transformBytes = formatSize(row.original.SizeInBytes.ValueInArchive);

            return <p>{transformBytes} ({row.original.SizeInBytes.ValueInArchive / row.original.SizeInBytes.Value * 100}%)</p>
        }
    }
];