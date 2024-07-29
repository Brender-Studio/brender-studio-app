import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ServerOff } from "lucide-react"
import { useState } from "react"
import DeleteDialog from "@/components/custom/dialogs/DeleteDialog"
import { terminateInstances } from "@/cli-functions/ec2/terminateInstances"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "@/components/ui/use-toast"
import { ec2Queries } from "@/react-query-utils/query-key-store/queryKeyStore"
import RefreshButton from "@/components/custom/buttons/RefreshButton"
import RedirectAwsButton from "@/components/custom/buttons/RedirectAwsButton"
import useRefreshQuery from "@/react-query-utils/queries/refresh-queries/useRefreshQuery"
import DataTableHeader from "@/components/custom/structure/DataTableHeader"
import { Skeleton } from "@/components/ui/skeleton"

interface DataTableInstanceProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    awsRegion: string
    linkAwsConsole: string
    awsProfile: string
    currentStack: string
    isQueryLoading: boolean
}

interface RowData {
    id: string

}

export function DataTableInstance<TData extends RowData, TValue>({
    columns,
    data,
    linkAwsConsole,
    awsRegion,
    awsProfile,
    currentStack,
    isQueryLoading,
}: DataTableInstanceProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = useState({})
    const [openDialog, setOpenDialog] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [inputValue, setInputValue] = useState("")

    const queryClient = useQueryClient()


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


    const itemsToDelete = selectedRows.map((row) => row.id)
    const itemsToShow = selectedRows.map((row) => row.id)

    const handleDelete = async () => {
        try {
            setIsLoading(true)
            const res = await terminateInstances(awsRegion, awsProfile, itemsToDelete)
            // console.log(res)

            if (res) {
                const ec2InstancesQueryKey = ec2Queries.instancesQueryKey(awsRegion!, awsProfile!, currentStack!);

                await queryClient.refetchQueries({
                    queryKey: ec2InstancesQueryKey,
                })

                toast({
                    title: 'Instances terminated',
                    description: 'The selected instances have been successfully terminated.',
                    variant: 'success',
                    duration: 2000,
                })
            }

        } catch (error) {
            console.error(error)
            if (error instanceof Error) {
                toast({
                    title: 'Error terminating instances',
                    description: error.message,
                    variant: 'destructive',
                })
            }
            setIsLoading(false)
        } finally {
            setIsLoading(false)
            setOpenDialog(false)
            setInputValue("")
        }
    }

    const { refreshQuery, isRefreshing } = useRefreshQuery(ec2Queries.instancesQueryKey(awsRegion!, awsProfile!, currentStack!));

    return (
        <>
            <div className="pb-4 flex items-center justify-between">
                <DataTableHeader
                    title="EC2 Instances"
                    description={`EC2 Servers in ${awsRegion} region.`}
                />
                <div className="flex gap-2 items-center">
                    <RefreshButton onClick={refreshQuery} isRefreshing={isRefreshing} />
                    <RedirectAwsButton linkAwsConsole={linkAwsConsole} />
                    <DeleteDialog
                        isDisabled={selectedRows.length === 0}
                        btnName="Terminate Instances"
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        iconButton={<ServerOff size={16} className="mr-2" />}
                        title="Terminate Instances"
                        description="Are you sure you want to terminate the selected instances? This action cannot be undone."
                        confirmationKeyword="Terminate"
                        confirmationLoadingKeyword="Terminating"
                        confirmationMessage="Type TERMINATE to confirm. This action cannot be undone."
                        onConfirm={handleDelete}
                        itemsToShow={itemsToShow}
                        openDialog={openDialog}
                        setOpenDialog={setOpenDialog}
                        isLoading={isLoading}
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
                                        <Skeleton className="w-full min-w-5 h-8" />
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
                                    No EC2 instances found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}