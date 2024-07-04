import useGetStackDetailsQuery from "@/react-query-utils/queries/stack-queries/useGetStackDetailsQuery";
import { DataTableStackDetail } from "./data-table-stack-details/DataTableStackDetail";
import { columns } from "./data-table-stack-details/columns";
import useGetStackInfoQuery from "@/react-query-utils/queries/stack-queries/useGetStackInfoQuery";
import { Skeleton } from "@/components/ui/skeleton";

export interface Resource {
    ResourceType: string;
    LogicalResourceId: string;
    PhysicalResourceId: string;
    LastUpdatedTimestamp: string;
}


const StackDetail = () => {
    const { data, isLoading } = useGetStackDetailsQuery();

    const { data: stackInfo, isLoading: isLoadingStackInfo } = useGetStackInfoQuery();

    const batchResources = data?.filter((resource: { ResourceType: string; }) => resource.ResourceType.startsWith('AWS::Batch')) || [];
    const storageResources = data?.filter((resource: { ResourceType: string; }) => ['AWS::S3::Bucket', 'AWS::EFS::FileSystem'].includes(resource.ResourceType)) || [];
    const networkingResources = data?.filter((resource: { ResourceType: string; }) => ['AWS::EC2::NetworkInterface', 'AWS::EC2::SecurityGroup', 'AWS::EC2::Subnet', 'AWS::EC2::VPC'].includes(resource.ResourceType)) || [];

    return (

        <div className="space-y-4 py-6">
            {
                isLoadingStackInfo ? (
                    <div className="space-y-2">
                        <Skeleton className="w-1/4 h-8" />
                        <Skeleton className="w-1/4 h-8" />
                        <Skeleton className="w-2/3 h-8" />
                    </div>
                ) : (
                    <div className="space-y-4 pb-2">
                        <p className="font-semibold">
                            Status: <span className="text-sm text-muted-foreground font-normal">{stackInfo[0]?.StackStatus}</span>
                        </p>
                        <p className="font-semibold">
                            Created At: <span className="text-sm text-muted-foreground font-normal">{new Date(stackInfo[0]?.CreationTime).toLocaleString()}</span>
                        </p>
                        <p className="font-semibold">
                            Description: <span className="text-sm text-muted-foreground font-normal">{stackInfo[0]?.Description}</span>
                        </p>
                    </div>
                )
            }
            {
                isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="w-full h-20" />
                        <Skeleton className="w-full h-20" />
                        <Skeleton className="w-full h-20" />
                    </div>
                ) : (
                    <>
                        <DataTableStackDetail
                            columns={columns}
                            data={storageResources}
                            titleResourceSection="Storage Resources"
                        />
                        <DataTableStackDetail
                            columns={columns}
                            data={batchResources}
                            titleResourceSection="Batch Resources"
                        />
                        <DataTableStackDetail
                            columns={columns}
                            data={networkingResources}
                            titleResourceSection="Networking Resources"
                        />
                    </>
                )
            }
        </div>

    )
}

export default StackDetail;
