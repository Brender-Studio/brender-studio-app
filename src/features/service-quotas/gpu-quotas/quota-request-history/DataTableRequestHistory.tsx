import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { serviceQuotaQueries } from '@/react-query-utils/query-key-store/queryKeyStore'
import useRefreshQuery from '@/react-query-utils/queries/refresh-queries/useRefreshQuery'
import RefreshButton from '@/components/custom/buttons/RefreshButton'
import RedirectAwsButton from '@/components/custom/buttons/RedirectAwsButton'
import DataTableHeader from '@/components/custom/structure/DataTableHeader'
import { Skeleton } from '@/components/ui/skeleton'

interface DataTableRequestHistoryProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    awsRegion: string
    linkAwsConsole: string
    awsProfile: string
    isQueryLoading: boolean
}

export function DataTableRequestHistory<TData, TValue>({
    columns,
    data,
    linkAwsConsole,
    awsRegion,
    awsProfile,
    isQueryLoading
}: DataTableRequestHistoryProps<TData, TValue>) {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const { refreshQuery, isRefreshing } = useRefreshQuery(serviceQuotaQueries.serviceQuotaHistoryQueryKey(awsProfile, awsRegion));


    return (
        <>
            <div className="pb-4 flex items-center justify-between">
                <DataTableHeader
                    title="Service Quota Request History"
                    description={`The history of the requests made to AWS Service Quotas.`}
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
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
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
                                        <Skeleton className="w-full h-8" />
                                        <Skeleton className="w-full h-8" />
                                        <Skeleton className="w-full h-8" />
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
                                        <TableCell key={cell.id} >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}

                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No data available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}