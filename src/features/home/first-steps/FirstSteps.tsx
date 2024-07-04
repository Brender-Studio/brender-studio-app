import BlenderIcon from "@/components/custom/icons/BlenderIcon"
import { Card } from "@/components/ui/card"
import { useUserSessionStore } from "@/store/useSessionStore"
import { User, Layers2, ChevronRight, Check } from "lucide-react"
import { useNavigate } from "react-router-dom"
import WelcomeBack from "./WelcomeBack"

const FirstSteps = () => {
    const navigate = useNavigate()
    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentStack, currentProfile } = sessionData;
    const blenderExecutablePath = localStorage.getItem('blenderExecutablePath')



    const steps = [
        {
            title: "Set up your AWS CLI profile",
            icon: User,
            isConfigured: currentProfile ? true : false
        },
        {
            title: "Deploy your first Brender Studio stack",
            icon: Layers2,
            isConfigured: currentStack ? true : false
        },
        {
            title: "Set Blender executable path",
            icon: BlenderIcon,
            isConfigured: blenderExecutablePath ? true : false
        }
    ]

    const handleStepClick = (index: number) => {
        switch (index) {
            case 0:
                navigate('/settings')
                break
            case 1:
                navigate('/stacks/deploy-stack')
                break
            case 2:
                navigate('/settings')
                break
            default:
                break
        }
    }

    const allStepsConfigured = steps.every(step => step.isConfigured);

    if (allStepsConfigured) {
        return <WelcomeBack />
    }

    return (
        <div className="w-full flex flex-col justify-center items-center space-y-3 py-8">
            <h1 className="text-center font-semibold text-4xl">Welcome to Brender Studio!</h1>

            <p className="text-sm text-muted-foreground text-center max-w-sm">
                Brender Studio is a desktop platform that allows you to create, manage, and monitor your Blender rendering jobs on AWS. To get started, you can follow the steps below.
            </p>

            <div className="grid grid-cols-1 gap-2 pt-4">
                {steps.map((step, index) => (
                    <Card
                        onClick={() => handleStepClick(index)}
                        key={index} className="min-w-[22rem] flex justify-between gap-4 p-6 items-center hover:bg-accent cursor-pointer">
                        <div className="flex items-center gap-4">
                            {step.icon && <step.icon size={16} />}
                            <p className="text-xs text-muted-foreground text-center max-w-sm">{step.title}</p>
                        </div>
                        {step.isConfigured ? (
                            <span className="bg-green-500 rounded-full p-2 transition-colors duration-700">
                                <Check size={16} className="text-white" strokeWidth={4} />
                            </span>
                        )
                            :
                            (
                                <span className="rounded-full p-2">
                                    <ChevronRight size={16} />
                                </span>
                            )
                        }
                    </Card>
                ))}

            </div>

        </div>
    )
}

export default FirstSteps