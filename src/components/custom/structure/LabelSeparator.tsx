import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface LabelSeparatorProps {
    label: string
    colSpan?: number
    my?: number
    py?: number
}

const LabelSeparator = ({ label, colSpan, my, py }: LabelSeparatorProps) => {
    return (
        <div className={`no-select relative w-full inline-flex items-center justify-center col-span-${colSpan || 5} my-${my || 8} py-${py || 0}`}
        >
            <Separator className="absolute w-full" />
            <Badge className="absolute z-50 text-center text-xs mx-2">
                {label}
            </Badge>
        </div>
    )
}

export default LabelSeparator