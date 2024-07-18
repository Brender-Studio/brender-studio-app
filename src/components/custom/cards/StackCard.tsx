import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DropdownCardStack from "../dropdowns/DropdownCardStack";
import ProgressBar from "../spinners/ProgressBar";
import { useUserSessionStore } from "@/store/useSessionStore";

interface CardStackProps {
    stackName: string
    stackStatus: string
    stackRegion: string
    stackId: string
}


const StackCard = ({ stackName, stackStatus, stackRegion, stackId }: CardStackProps) => {
    const navigate = useNavigate()
    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentStack } = sessionData;

    const handleRedirect = (stackId: string) => {
        navigate(`/stacks/${stackId}`)
    }

    const getBadgeVariant = (stackStatus: string | undefined): string => {
        switch (stackStatus) {
            case 'CREATE_COMPLETE':
                return 'success';
            case 'CREATE_IN_PROGRESS':
            case 'UPDATE_IN_PROGRESS':
                return 'progress';
            case 'DELETE_IN_PROGRESS':
            case 'ROLLBACK_IN_PROGRESS':
                return 'warning';
            case 'DELETE_COMPLETE':
            case 'ROLLBACK_COMPLETE':
            case 'UPDATE_COMPLETE':
                return 'success';
            case 'CREATE_FAILED':
            case 'DELETE_FAILED':
            case 'ROLLBACK_FAILED':
            case 'UPDATE_FAILED':
                return 'failed';
            default:
                return 'default';
        }
    }

    const badgeVariant = getBadgeVariant(stackStatus) as 'default' | 'success' | 'warning' | 'failed' | 'progress'




    return (
        <Card className={currentStack === stackName ? 'relative min-h-80 justify-between flex flex-col hover:bg-accent border border-[#F63652]/30' : ' min-h-80 justify-between flex flex-col hover:bg-accent'}
        >
            {
                currentStack === stackName && (
                    <div className="absolute -top-3 flex items-center justify-center w-full">
                        <Badge className="border border-[#F63652]/30" variant='secondary'>CURRENT</Badge>
                    </div>
                )
            }
            <CardHeader className="relative">
                <CardTitle className="text-lg">
                    {
                        stackStatus === 'CREATE_IN_PROGRESS' || stackStatus === 'UPDATE_IN_PROGRESS' || stackStatus === 'DELETE_IN_PROGRESS' || stackStatus === 'ROLLBACK_IN_PROGRESS' ? <ProgressBar /> : null
                    }
                    <div className="flex justify-between items-center gap-2">
                        <p className="truncate" title={stackName}>
                            {stackName.toLocaleUpperCase()}
                        </p>
                        <DropdownCardStack
                            stackStatus={stackStatus}
                            stackName={stackName}
                            awsLinkConsole={`https://console.aws.amazon.com/cloudformation/home?region=${stackRegion}#/stacks/stackinfo?stackId=${stackId}`}
                        />
                    </div>
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                    {stackStatus &&
                        <Badge className="mr-2" variant={badgeVariant}>
                            {stackStatus}
                        </Badge>
                    }
                </div>
                <CardDescription className="pt-2">
                    Brender Stack AWS Resources in {stackRegion} region.
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button
                    onClick={() => handleRedirect(stackName)}
                    className="w-full rounded-sm"
                    variant="secondary"
                    size="default">
                    <span className="mr-2">
                        <Info size={16} />
                    </span>
                    Stack Details
                </Button>
            </CardFooter>
        </Card>
    )
}

export default StackCard