import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SpinnerButton from "../../../components/custom/spinners/SpinnerButton"
import { useNavigate } from "react-router-dom"

interface NotificationBuildCardProps {
    buildId: string
    startedAt: string
}

const NotificationBuildCard = ({ startedAt }: NotificationBuildCardProps) => {
    const navigate = useNavigate()

    const convertDate = (date: string) => {
        const newDate = new Date(date)
        return newDate.toLocaleString()
    }

    return (
        <div className="p-0 w-full flex flex-col cursor-pointer"
            onClick={() => navigate(`/builds`)}
        >
            <CardHeader className="p-2 w-full">
                <CardTitle className="flex justify-between  gap-2 items-center text-sm">
                    Deploying new Farm 
                    <SpinnerButton />
                </CardTitle>
            </CardHeader>
            <CardContent className="py-0 px-2 w-full space-y-2">
                <CardDescription>
                    Executing build for project: <span className="font-semibold">brender-cdk-build-v1</span>
                </CardDescription>
                <p className="text-xs text-end text-muted-foreground pt-2">
                    Started at {convertDate(startedAt)}
                </p>
            </CardContent>
        </div>
    )
}

export default NotificationBuildCard