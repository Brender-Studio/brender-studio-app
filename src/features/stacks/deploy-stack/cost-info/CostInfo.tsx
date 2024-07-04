import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info } from 'lucide-react'

const CostInfo = () => {
    return (
        <>
            <Alert variant='info' className="my-4">
                <Info className="h-4 w-4" />
                <AlertTitle>Cost information</AlertTitle>
                <AlertDescription>
                    When using AWS Batch, it's important to note that the cost of EC2 instances is separate from networking costs (VPC Endpoints, NAT, etc.).
                    EC2 instances are billed per second, and the cost varies based on the instance type and the region where the instances are running. On the other hand, networking costs are fixed and depend on the region where the stack is deployed.
                </AlertDescription>
            </Alert>

        </>
    )
}

export default CostInfo