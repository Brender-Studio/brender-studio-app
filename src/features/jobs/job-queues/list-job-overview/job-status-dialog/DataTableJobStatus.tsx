import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { jobQueries } from '@/react-query-utils/query-key-store/queryKeyStore'
import TerminateJobsDialog from './TerminateJobsDialog'
import RefreshButton from '@/components/custom/buttons/RefreshButton'
import RedirectAwsButton from '@/components/custom/buttons/RedirectAwsButton'
import useRefreshQuery from '@/react-query-utils/queries/refresh-queries/useRefreshQuery'
import { Skeleton } from '@/components/ui/skeleton'

interface DataTableJobStatusProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    awsRegion: string
    linkAwsConsole: string
    awsProfile: string
    currentStack: string
    jobQueueName: string
    jobStatus: string
    isQueryLoading: boolean
}

export function DataTableJobStatus<TData, TValue>({
    columns,
    data,
    linkAwsConsole,
    awsRegion,
    awsProfile,
    currentStack,
    jobQueueName,
    jobStatus,
    isQueryLoading
}: DataTableJobStatusProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = useState({})
    const [openDialog, setOpenDialog] = useState(false)


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
    })

    // Get data from selected rows in the table
    const selectedRows = table.getFilteredSelectedRowModel().rows.map(
        (row) => row.original
    )

    const itemsToDelete = selectedRows.map((row: any) => row.jobId)

    const { refreshQuery, isRefreshing } = useRefreshQuery(jobQueries.jobByStatusQueryKey(awsRegion!, awsProfile!, currentStack!, jobStatus, jobQueueName))

    return (
        <>
            <div className="py-4 flex items-center justify-between">
                <p className="font-semibold text-lg">
                    Jobs ({jobStatus})
                </p>
                <div className="flex gap-2 items-center">
                    <RefreshButton onClick={refreshQuery} isRefreshing={isRefreshing} />
                    <RedirectAwsButton linkAwsConsole={linkAwsConsole} />
                    <TerminateJobsDialog
                        openDialog={openDialog}
                        setOpenDialog={setOpenDialog}
                        title="Terminate Jobs"
                        description="Are you sure you want to terminate the following jobs?"
                        jobIds={itemsToDelete}
                        awsProfile={awsProfile}
                        awsRegion={awsRegion}
                        currentStack={currentStack}
                        jobQueueName={jobQueueName}
                        jobStatus={jobStatus}
                    />
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
                                        <Skeleton className="w-full min-w-4 h-8" />
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
                                        <TableCell key={cell.id}>
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