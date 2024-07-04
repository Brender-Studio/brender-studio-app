import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { HelpCircle } from "lucide-react"

interface HoverCardInfoProps {
    title: string
    content: string
    children?: React.ReactNode
}

const HoverCardInfo = ({ title, content, children }: HoverCardInfoProps) => {
    return (
        <HoverCard>
            <HoverCardTrigger>
                <HelpCircle size={16} className="cursor-pointer text-muted-foreground font-semibold" />
            </HoverCardTrigger>
            <HoverCardContent align="start" className="bg-tooltip min-w-72 z-[999]">
                <h3 className="font-semibold text-sm">
                    {title}
                </h3>
                <p className="text-xs text-muted-foreground">
                    {content}
                </p>
                {
                    children && (
                        <div className="mt-2">
                            {children}
                        </div>

                    )
                }
            </HoverCardContent>
        </HoverCard>

    )
}

export default HoverCardInfo