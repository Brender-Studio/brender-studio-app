import { Skeleton } from "@/components/ui/skeleton"



export const CumulativeTotalCostSkeleton = () => {
    return (
        <div className="pt-4 flex items-center justify-center gap-4">
            <div className="flex flex-col items-end gap-2">
                <Skeleton className="h-2 w-12 rounded-sm" />
                <Skeleton className="h-2 w-20 rounded-sm" />
            </div>
            <Skeleton className="h-10 w-0.5 rounded-sm" />
            <div className="flex flex-col items-start gap-2">
                <Skeleton className="h-2 w-12 rounded-sm" />
                <Skeleton className="h-2 w-20 rounded-sm" />
            </div>
        </div>
    )
}


export const SectionChartsSkeleton = () => {
    return (
        <div className="mt-10 min-h-[400px] h-[400px] w-full flex flex-col gap-2 justify-center items-center">
            <Skeleton className="w-[25%] h-4 rounded-sm" />
            <Skeleton className="w-full mt-6 h-full rounded-sm" />
        </div>
    )
}


export const TableExplorerSkeleton = () => {
    return (
        <div className="min-h-[368px] h-[368px] w-full flex flex-col mt-4 justify-center items-start gap-4">
            <Skeleton className="w-[25%] h-6 rounded-sm" />
            <Skeleton className="w-full h-full rounded-sm" />
        </div>
    )
}