import { Skeleton } from "@/components/ui/skeleton"

const StackDetailSkeleton = () => {
    return (
        <div className="flex flex-col space-y-3 py-8">
            <Skeleton className="h-[30px]  w-[300px] rounded-full bg-white/10" />
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                <Skeleton className="h-96 w-full rounded-md bg-white/10" />
                <Skeleton className="h-96 w-full rounded-md bg-white/10" />
                <Skeleton className="h-96 w-full rounded-md bg-white/10" />
            </div>
        </div>
    )
}

export default StackDetailSkeleton