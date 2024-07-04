import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ec2Queries } from "@/react-query-utils/query-key-store/queryKeyStore"
import RedirectAwsButton from "@/components/custom/buttons/RedirectAwsButton"
import useRefreshQuery from "@/react-query-utils/queries/refresh-queries/useRefreshQuery"
import RefreshButton from "@/components/custom/buttons/RefreshButton"
import DataTableHeader from "@/components/custom/structure/DataTableHeader"
import { Skeleton } from "@/components/ui/skeleton"


interface DataTableAutoscalingProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    awsRegion: string
    linkAwsConsole: string
    awsProfile: string
    currentStack: string
    isQueryLoading: boolean
}

export function DataTableAutoscaling<TData, TValue>({
    columns,
    data,
    linkAwsConsole,
    awsRegion,
    awsProfile,
    currentStack,
    isQueryLoading,
}: DataTableAutoscalingProps<TData, TValue>) {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const { refreshQuery, isRefreshing } = useRefreshQuery(ec2Queries.autoscalingGroupsQueryKey(awsRegion!, awsProfile!, currentStack!));

    return (
        <>
            <div className="pb-4 flex items-center justify-between">
                <DataTableHeader
                    title="Auto Scaling Groups"
                    description={`Auto Scaling groups are used to automatically scale EC2 Servers based on the load of the rendering jobs.`}
                />
                <div className="flex gap-2 items-center">
                    <RefreshButton onClick={refreshQuery} isRefreshing={isRefreshing} />
                    <RedirectAwsButton linkAwsConsole={linkAwsConsole} />
                </div>
            </div>
            <div>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className="w-20" key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isQueryLoading ? (
                            <TableRow>
                                {Array.from({ length: columns.length }).map((_, index) => (
                                    <TableCell key={index} className="text-center space-y-4">
                                        <Skeleton className="w-full h-20" />
                                        <Skeleton className="w-full h-20" />
                                        <Skeleton className="w-full h-20" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className=" max-w-40">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}

                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No autoscaling groups found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}