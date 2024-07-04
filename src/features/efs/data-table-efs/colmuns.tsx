import { ColumnDef } from "@tanstack/react-table";
import { open } from "@tauri-apps/api/shell";

export type EfsData = {
    CreationTime: string;
    CreationToken: string;
    Encrypted: boolean;
    FileSystemArn: string;
    FileSystemId: string;
    FileSystemProtection: {
        ReplicationOverwriteProtection: string;
    };
    KmsKeyId: string;
    LifeCycleState: string;
    Name: string;
    NumberOfMountTargets: number;
    OwnerId: string;
    PerformanceMode: string;
    SizeInBytes: {
        Value: number;
        Timestamp: string;
        ValueInIA: number;
        ValueInStandard: number;
        ValueInArchive: number;
    };
    Tags: {
        Key: string;
        Value: string;
    }[];
    ThroughputMode: string;
};


export const columns: ColumnDef<EfsData>[] = [
    {
        id: "FileSystemId",
        header: "FileSystem Id",
        cell: ({ row }) => {

            const openUrl = (id: string) => {
                console.log('id: ', id)
                // extract region from arn
                const region = row.original.FileSystemArn.split(":")[3];
                const url = `https://${region}.console.aws.amazon.com/efs/home?region=${region}#/file-systems/${id}`;
                open(url);
            };

            return (
                <div
                    onClick={() => openUrl(row.original.FileSystemId)}
                    className="text-blue-500 hover:underline cursor-pointer font-semibold"
                    style={{ wordBreak: 'break-all' }}
                >
                    <span title={row.original.FileSystemId} >
                        {row.original.FileSystemId}
                    </span>
                </div >
            )
        }
    },
    // {
    //     id: "Name",
    //     header: "Name",
    //     cell: ({ row }) => row.original.Name,
    // },
    {
        id: "SizeInBytes",
        header: "Size (GB)",
        cell: ({ row }) => {
            // convert bytes to GB
            const bytes = row.original.SizeInBytes.Value
            const gb = bytes / (1024 * 1024 * 1024)
            return <p>{gb.toFixed(4)} GB</p>
            // <p>{row.original.SizeInBytes.Value}</p>
        }

    },
    {
        id: "ThroughputMode",
        header: "Throughput Mode",
        cell: ({ row }) => row.original.ThroughputMode.toLocaleUpperCase()
    },
    {
        id: "Encrypted",
        header: "Encrypted",
        cell: ({ row }) => row.original.Encrypted ? 'Yes' : 'No'
    },
    {
        id: "PerformanceMode",
        header: "Performance Mode",
        cell: ({ row }) => row.original.PerformanceMode.toLocaleUpperCase()
    },
    {
        id: "LifeCycleState",
        header: "LifeCycle State",
        cell: ({ row }) => row.original.LifeCycleState.toLocaleUpperCase()
    },
];