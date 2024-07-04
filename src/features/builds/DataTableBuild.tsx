import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { deployConfig } from "@/cli-functions/deploy/deploy-config/deployConfig"
import RedirectAwsButton from "@/components/custom/buttons/RedirectAwsButton"
import DataTableHeader from "@/components/custom/structure/DataTableHeader"
import { Skeleton } from "@/components/ui/skeleton"

interface DataTableBuildProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  awsRegion: string
  linkAwsConsole: string
  awsProfile: string
  isQueryLoading: boolean
}

export function DataTableBuild<TData, TValue>({
  columns,
  data,
  linkAwsConsole,
  isQueryLoading,
}: DataTableBuildProps<TData, TValue>) {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })


  return (
    <>
      <div className="pb-4 flex items-center justify-between">
        <DataTableHeader
          title={deployConfig.codeBuild.projectName}
          description={`CodeBuild status for Brender Studio Farm deployment.`}
        />
        <div className="flex gap-2 items-center">
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
