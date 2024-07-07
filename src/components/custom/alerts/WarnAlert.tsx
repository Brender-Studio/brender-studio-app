import { Alert, AlertDescription, AlertTitle, alertVariants } from "@/components/ui/alert"
import { VariantProps } from "class-variance-authority"
import { AlertTriangle } from "lucide-react"

interface WarnAlertProps {
    title: string
    variant: VariantProps<typeof alertVariants>['variant']
    description: string
    icon?: React.ReactNode
    className?: string
    contentDescription?: React.ReactNode
}

const WarnAlert = ({ title, variant, description, className, contentDescription, icon }: WarnAlertProps) => {
    return (
        <div className={className}>
            <Alert variant={variant ? variant : 'default'} title={title} >
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