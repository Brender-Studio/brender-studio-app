import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

interface WarnAlertProps {
    title: string
    variant: string
    description: string
    icon?: React.ReactNode
    className?: string
    contentDescription?: React.ReactNode
}

const WarnAlert = ({ title, variant, description, className, contentDescription, icon }: WarnAlertProps) => {
    return (
        <div className={className}>
            <Alert variant={variant ? variant : 'default' as any} title={title} >
                {/* <AlertTriangle size={16} /> */}
                {icon ? icon : <AlertTriangle size={16} />}
                <AlertTitle>
                    {title}
                </AlertTitle>
                <AlertDescription>
                    {description}
                    {contentDescription && contentDescription}
                </AlertDescription>
            </Alert>
        </div>
    )
}

export default WarnAlert