import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DataTableHeader from "@/components/custom/structure/DataTableHeader"
import { Skeleton } from "@/components/ui/skeleton"


interface DataTableMeteredSizeProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    isQueryLoading: boolean
}

export function DataTableMeteredSize<TData, TValue>({
    columns,
    data,
    isQueryLoading,
}: DataTableMeteredSizeProps<TData, TValue>) {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    // console.log('Data from DataTableMeteredSize:', data)

    return (
        <>
            <div className="pb-4 flex items-center justify-between">
                <DataTableHeader
                    title="Metered Size"
                    description={`Metered size of the EFS file system. It is the sum of the sizes of all files and directories in the file system.`}
                />
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