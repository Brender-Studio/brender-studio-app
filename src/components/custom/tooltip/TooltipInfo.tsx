import { Tooltip, TooltipContent, TooltipFooter, TooltipTitle, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, TriangleAlert } from "lucide-react"

interface TooltipInfoProps {
    title?: string
    description?: string
    footer?: string | React.ReactNode
    iconWarning?: boolean
    classTitle?: string
    align?: 'start' | 'center' | 'end'
}

const TooltipInfo = ({ description, iconWarning, title, classTitle, footer, align }: TooltipInfoProps) => {
    return (
            <Tooltip>
                <TooltipTrigger asChild>
                    {iconWarning ? (
                        <TriangleAlert size={16} className="cursor-pointer text-muted-foreground font-semibold" />
                    ) : (
                        <Info size={16} className="cursor-pointer text-muted-foreground font-semibold" />
                    )}
                </TooltipTrigger>
                <TooltipContent align={align} className="p-4 z-[999]">
                    {title &&
                        <TooltipTitle className={classTitle}>
                            {title}
                        </TooltipTitle>
                    }
                    <p className="text-muted-foreground text-xs max-w-80">{description}</p>
                    {footer &&
                        <TooltipFooter>
                            {footer}
                        </TooltipFooter>
                    }
                </TooltipContent>
            </Tooltip>
    )
}

export default TooltipInfo