import { useState } from "react"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DeleteDialog from "@/components/custom/dialogs/DeleteDialog"
import { Trash2 } from "lucide-react"
import { deleteEcrImages } from "@/cli-functions/ecr-data/deleteEcrImages"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "@/components/ui/use-toast"
import { deployConfig } from "@/cli-functions/deploy/deploy-config/deployConfig"
import RedirectAwsButton from "@/components/custom/buttons/RedirectAwsButton"
import DataTableHeader from "@/components/custom/structure/DataTableHeader"
import { Skeleton } from "@/components/ui/skeleton"

interface DataTableEcrProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  awsRegion: string
  linkAwsConsole: string
  awsProfile: string
  isQueryLoading: boolean
}

interface EcrImageRow {
  imageDigest: string;
  imageTags: string;
}

export function DataTableEcr<TData, TValue>({
  columns,
  data,
  linkAwsConsole,
  awsRegion,
  awsProfile,
  isQueryLoading,
}: DataTableEcrProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [openDialog, setOpenDialog] = useState(false)
  const [isLoadingButton, setIsLoadingButton] = useState(false)
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
    (row) => row.original as EcrImageRow
  )

  const itemsToDelete = selectedRows.map((row: EcrImageRow) => row.imageDigest)
  const itemsToShow = selectedRows.map((row: EcrImageRow) => row.imageTags || row.imageDigest)

  const handleDelete = async () => {
    try {
      setIsLoadingButton(true)
      await deleteEcrImages(awsRegion, awsProfile, itemsToDelete)
      // console.log(res)
      await queryClient.refetchQueries({
        queryKey: ['ecr-images', awsRegion],
      })

      toast({
        title: 'Images deleted',
        description: 'Images have been deleted successfully',
        variant: 'success',
        duration: 2000,
      })

    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        toast({
          title: 'Error deleting images',
          description: error.message,
          variant: 'destructive',
        })
      }

    } finally {
      setIsLoadingButton(false)
      setOpenDialog(false)
      setInputValue("")
    }
  }

  return (
    <>
      <div className="pb-4 flex items-center justify-between">
        <DataTableHeader
          title={deployConfig.ecr.repositoryName}
          description={`Brender Studio ECR images for the ${deployConfig.ecr.repositoryName} repository.`}
        />
        <div className="flex gap-2 items-center">
          <RedirectAwsButton linkAwsConsole={linkAwsConsole} />
          <DeleteDialog
            isDisabled={selectedRows.length === 0}
            btnName="Delete Images"
            inputValue={inputValue}
            setInputValue={setInputValue}
            iconButton={<Trash2 size={16} className="mr-2" />}
            title="Delete ECR Images"
            description="Are you sure you want to delete the selected images?"
            confirmationKeyword="Delete"
            confirmationLoadingKeyword="Deleting"
            confirmationMessage="Type DELETE to confirm. This action cannot be undone."
            onConfirm={handleDelete}
            itemsToShow={itemsToShow}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            isLoading={isLoadingButton}
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
                    <Skeleton className="w-full h-8" />
                    <Skeleton className="w-full h-8" />
                    <Skeleton className="w-full h-8" />
                  </TableCell>
                ))}
              </TableRow>
            ) : table.getRowModel().rows.length ? (
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
