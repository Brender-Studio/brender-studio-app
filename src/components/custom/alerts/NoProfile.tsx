import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const NoProfile = () => {
    const navigate = useNavigate()

    const handleConfigureProfile = () => {
        navigate('/settings')
    }

    return (
        <div className="h-[80vh] w-full flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center gap-4">
                <p className="text-sm text-center text-muted-foreground">No AWS CLI profile selected. Please configure your AWS CLI profile before deploying a stack.</p>
                <Button onClick={handleConfigureProfile} className="mt-4 w-36 mx-auto" variant="default" size="lg">Configure Profile</Button>
            </div>
        </div>
    )
}

export default NoProfile