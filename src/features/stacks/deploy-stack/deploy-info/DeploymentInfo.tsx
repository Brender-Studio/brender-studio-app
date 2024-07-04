import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

const DeploymentInfo = () => {
    return (
        <>
            <Alert variant='warning' className="my-4">
                <Info className="h-4 w-4" />
                <AlertTitle className="mb-2">Deployment Information</AlertTitle>
                <div className="space-y-4">
                    <AlertDescription>
                        Brender Studio utilizes AWS Cloud Development Kit (CDK) to orchestrate the deployment of the stack. This stack will be provisioned in your AWS account using the credentials from the selected profile. Ensure that the chosen profile has the necessary permissions to create the resources specified in the stack.
                    </AlertDescription>
                    <AlertDescription>
                        The stack will be established in the region you've selected. Please be aware that the resources created by the stack will incur charges on your AWS account, so ensure you have budgeted accordingly.
                    </AlertDescription>
                </div>
            </Alert>
        </>
    )
}

export default DeploymentInfo