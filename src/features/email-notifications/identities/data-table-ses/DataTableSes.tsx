import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"
import { MailMinus } from "lucide-react"
import RefreshButton from "@/components/custom/buttons/RefreshButton"
import { sesQueries } from "@/react-query-utils/query-key-store/queryKeyStore"
import useRefreshQuery from "@/react-query-utils/queries/refresh-queries/useRefreshQuery"
import { deleteIdentities } from "@/cli-functions/ses-data/deleteIdentities"
import DeleteDialog from "@/components/custom/dialogs/DeleteDialog"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "@/components/ui/use-toast"
import AddIdentityDialog from "./add-identity-dialog/AddIdentityDialog"
import DataTableHeader from "@/components/custom/structure/DataTableHeader"
import { Skeleton } from "@/components/ui/skeleton"


interface DataTableSesProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    awsRegion: string
    awsProfile: string
    isQueryLoading: boolean
}


export function DataTableSes<TData, TValue>({
    columns,
    data,
    awsRegion,
    awsProfile,
    isQueryLoading,
}: DataTableSesProps<TData, TValue>) {
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

    const itemsToDelete = selectedRows.map((row: any) => row.identity)
    const itemsToShow = selectedRows.map((row: any) => row.identity)

    const handleDelete = async () => {
        console.log("Deleting", itemsToDelete)
        try {
            setIsLoading(true)
            await deleteIdentities(itemsToDelete, awsRegion, awsProfile)

            await queryClient.refetchQueries({
                queryKey: sesQueries.sesIdentitiesQueryKey(awsRegion, awsProfile),
            })

            toast({
                title: 'Identity deleted',
                description: 'Identities have been deleted successfully.',
                variant: 'success',
            })

        } catch (error) {
            console.error(error)
            toast({
                title: 'Error',
                description: 'Failed to delete identities. Please try again.',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
            setOpenDialog(false)
        }
    }

    const { refreshQuery, isRefreshing } = useRefreshQuery(sesQueries.sesIdentitiesQueryKey(awsRegion, awsProfile));

    return (
        <>
            <div className="flex items-center w-full justify-between mb-4">
                <DataTableHeader
                    title={`SES Emails in ${awsRegion} region`}
                    description="Emails that are currently available for sending emails when rendering is done."
                />
                <div className="flex items-center gap-2">
                    <RefreshButton onClick={refreshQuery} isRefreshing={isRefreshing} />
                    <AddIdentityDialog />
                    <DeleteDialog
                        isDisabled={selectedRows.length === 0}
                        btnName="Remove Identity"
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        iconButton={<MailMinus size={16} className="mr-2" />}
                        title="Remove Identities from SES"
                        description="Are you sure you want to remove the selected identities?"
                        confirmationKeyword="Remove"
                        confirmationLoadingKeyword="Removing"
                        confirmationMessage="Type REMOVE to confirm."
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
                                    No Emails available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}