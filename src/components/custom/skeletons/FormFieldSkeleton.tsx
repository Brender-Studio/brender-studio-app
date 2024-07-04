import { Skeleton } from "@/components/ui/skeleton"

const FormFieldSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-2 w-full">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
    </div>
  )
}

export default FormFieldSkeleton