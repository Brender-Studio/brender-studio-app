import { Skeleton } from "@/components/ui/skeleton"


const CardSkeleton = () => {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="min-h-80 w-full rounded-md bg-white/10" />
        </div>
    )
}

export default CardSkeleton