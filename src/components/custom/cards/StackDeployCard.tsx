import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { useUserSessionStore } from '@/store/useSessionStore'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const StackDeployCard = () => {
    const navigate = useNavigate()
    // const { isCliInstalled } = useUserSessionStore()
    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { isCliInstalled } = sessionData;

    const handleDeploy = () => {
        navigate('/stacks/deploy-stack')
    }

    return (
        <Card className='min-h-80 justify-between flex flex-col hover:bg-accent'>
            <CardHeader >
                <CardTitle>New Farm</CardTitle>
                <CardDescription>
                    Deploy New Brender Studio Render Farm with AWS Services
                </CardDescription>
            </CardHeader>
            <CardFooter className='flex flex-col space-y-2'>
                {!isCliInstalled && (
                    <p className='text-xs text-destructive mt-2 text-center mb-4 font-semibold'>
                        AWS CLI v2 is not installed. Please install it before deploying a stack.
                    </p>
                )}
                <Button className='w-full' onClick={handleDeploy} disabled={!isCliInstalled}>
                    <Plus size={16} className='mr-2' />
                    Create New Farm
                </Button>
            </CardFooter>
        </Card>
    )
}

export default StackDeployCard