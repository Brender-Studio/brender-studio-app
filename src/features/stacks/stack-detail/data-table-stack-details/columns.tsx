import SpinnerButton from "@/components/custom/spinners/SpinnerButton";
import { ColumnDef } from "@tanstack/react-table";


type StackResource = {
    DriftInformation?: {
        StackResourceDriftStatus: string;
    };
    LastUpdatedTimestamp: string;
    LogicalResourceId: string;
    PhysicalResourceId: string;
    ResourceStatus: string;
    ResourceType: string;
};

const resourceNameMappping = (resourceType: string) => {
    const mapping: { [key: string]: string } = {
        'AWS::S3::Bucket': 'S3 Bucket',
        'AWS::EFS::FileSystem': 'EFS File System',
        'AWS::Batch::ComputeEnvironment': 'Batch Compute Environment',
        'AWS::Batch::JobDefinition': 'Batch Job Definition',
        'AWS::Batch::JobQueue': 'Batch Job Queue',
        'AWS::EC2::Instance': 'EC2 Instance',
        'AWS::EC2::NetworkInterface': 'EC2 Network Interface',
        'AWS::EC2::SecurityGroup': 'EC2 Security Group',
        'AWS::EC2::Subnet': 'EC2 Subnet',
        'AWS::EC2::VPC': 'EC2 VPC',
    }
    return mapping[resourceType] || resourceType;
}

export const columns: ColumnDef<StackResource>[] = [
    {
        id: "ResourceType",
        header: "Resource Type",
        cell: ({ row }) => (
            <span>{resourceNameMappping(row.original.ResourceType)}</span>
        )
    },
    {
        id: "LogicalResourceId",
        header: "Logical Resource Id",
        cell: ({ row }) => row.original.LogicalResourceId,
    },
    // {
    //     id: "PhysicalResourceId",
    //     header: "Physical Resource Id",
    //     cell: ({ row }) => row.original.PhysicalResourceId,
    // },
    {
        id: "ResourceStatus",
        header: "Resource Status",
        cell: ({ row }) => {
            const isDeleteComplete = row.original.ResourceStatus === 'DELETE_COMPLETE';
            const isCreateComplete = row.original.ResourceStatus === 'CREATE_COMPLETE';
            const isInProgress = row.original.ResourceStatus === 'CREATE_IN_PROGRESS' ||
                row.original.ResourceStatus === 'DELETE_IN_PROGRESS'

            const getStatusClass = () => {
                if (isDeleteComplete) return 'text-red-500';
                if (isCreateComplete) return 'text-green-500';
                return 'text-muted-foreground';
            };

            return (
                <div className="font-semibold items-center">
                    <div className={getStatusClass()}>
                        <span className={isInProgress ? 'flex items-center gap-2' : ''} >
                            {isInProgress && <SpinnerButton />}
                            {row.original.ResourceStatus}
                        </span>
                    </div>
                </div>
            );
        }
    },

    // {
    //     id: "DriftInformation",
    //     header: "Drift Information",
    //     cell: ({ row }) => row.original.DriftInformation ? row.original.DriftInformation.StackResourceDriftStatus : "N/A",
    // },
    {
        id: "LastUpdatedTimestamp",
        header: "Last Updated",
        cell: ({ row }) => (
            <span>{new Date(row.original.LastUpdatedTimestamp).toLocaleString()}</span>
        )
    },
];



