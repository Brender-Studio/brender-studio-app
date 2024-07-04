import { verifyEmail } from "@/cli-functions/ses-data/verifyEmail"
import SpinnerButton from "@/components/custom/spinners/SpinnerButton"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Send } from "lucide-react"
import { useState } from "react"

interface ResendEmailButtonProps {
    profile: string
    region: string
    identity: string
    disabled: boolean
}

const ResendEmailButton = ({ profile, region, identity, disabled }: ResendEmailButtonProps) => {
    const [isSending, setIsSending] = useState(false)

    const handleResend = async () => {
        try {
            setIsSending(true)
            await verifyEmail(identity, region, profile)
            setIsSending(false)
            toast({
                variant: 'success',
                title: 'Email Verification Resent',
                description: 'Email verification has been resent. Please check your inbox.'
            })
        } catch (error) {
            setIsSending(false)
            toast({
                variant: 'destructive',
                title: 'Error Resending Email Verification',
                description: 'Failed to resend email verification. Please try again.'
            
            })
        } finally {
            setIsSending(false)
        }
    }

    return (
        <Button
            size="sm"
            variant="outline"
            className="w-full"
            disabled={disabled || isSending}
            onClick={handleResend}
        >
            {isSending ? <SpinnerButton /> : <Send size={16} className="mr-2" />}
            {isSending ? <span className="ml-2">
                Resending
            </span> : 'Resend'}
        </Button>
    )
}

export default ResendEmailButton