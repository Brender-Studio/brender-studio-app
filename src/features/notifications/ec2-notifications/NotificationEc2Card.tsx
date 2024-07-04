import SpinnerButton from '@/components/custom/spinners/SpinnerButton'
import { CardContent, CardDescription } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

interface NotificationEc2CardProps {
    id: string
    instanceType: string
    availabilityZone: string
    instanceStatus: string
}

const NotificationEc2Card = ({ instanceType, availabilityZone, instanceStatus }: NotificationEc2CardProps) => {
    const navigate = useNavigate()

    return (
        <div className="p-0 w-full flex flex-col cursor-pointer"
            onClick={() => navigate(`/instances`)}
        >
            <CardContent className="p-2 w-full flex justify-between">
                <div>
                    <CardDescription className='text-xs text-white font-semibold'>
                        Server EC2 Type:
                        <span className='text-muted-foreground'>
                            {' '} {instanceType}
                        </span>
                    </CardDescription>
                    <CardDescription className='text-xs text-white font-semibold'>
                        Region Zone:
                        <span className='text-muted-foreground'>
                            {' '}{availabilityZone}
                        </span>

                    </CardDescription>
                    <CardDescription className='text-xs text-white font-semibold'>
                        Status: <span className="font-semibold text-green-500">{instanceStatus.toUpperCase()}</span>
                    </CardDescription>
                </div>
                <div>
                    <SpinnerButton />
                </div>
            </CardContent>
        </div>
    )
}

export default NotificationEc2Card