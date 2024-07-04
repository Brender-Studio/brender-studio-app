import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useRefreshQuery from "@/react-query-utils/queries/refresh-queries/useRefreshQuery"
import { efsQueries } from "@/react-query-utils/query-key-store/queryKeyStore"
import RefreshButton from "@/components/custom/buttons/RefreshButton"
import RedirectAwsButton from "@/components/custom/buttons/RedirectAwsButton"
import EmptyEfsDialog from "./EmptyEfsDialog"
import { useState } from "react"
import DataTableHeader from "@/components/custom/structure/DataTableHeader"
import { Skeleton } from "@/components/ui/skeleton"


interface DataTableEfsProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    awsRegion: string
    linkAwsConsole: string
    awsProfile: string
    currentStack: string
    isQueryLoading: boolean
}

export function DataTableEfs<TData, TValue>({
    columns,
    data,
    linkAwsConsole,
    awsRegion,
    awsProfile,
    currentStack,
    isQueryLoading,
}: DataTableEfsProps<TData, TValue>) {
    const [openDialog, setOpenDialog] = useState(false)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const { refreshQuery, isRefreshing } = useRefreshQuery(efsQueries.efsQueryKey(currentStack!, awsRegion!, awsProfile!));

    return (
        <>
            <div className="pb-4 flex items-center justify-between">
                <DataTableHeader
                    title="Elatic File System (EFS)"
                    description={`EFS file system for ${currentStack} farm.`}
                />
                <div className="flex gap-2 items-center">
                    <RefreshButton onClick={refreshQuery} isRefreshing={isRefreshing} />
                    <RedirectAwsButton linkAwsConsole={linkAwsConsole} />
                    <EmptyEfsDialog
                        openDialog={openDialog}
                        setOpenDialog={setOpenDialog}
                        currentStack={currentStack}
                        awsRegion={awsRegion}
                        profile={awsProfile}
                    />
                </div>
            </div>
            <div>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} >
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