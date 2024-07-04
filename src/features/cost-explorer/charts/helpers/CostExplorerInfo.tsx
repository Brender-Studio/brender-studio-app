import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"


const CostExplorerInfo = () => {
    return (
        <Alert variant='info' className="my-4">
            <Info size={16} />
            <AlertTitle>Cost Explorer Information</AlertTitle>
            <div className="space-y-2">
                <AlertDescription>
                    Brender Studio uses Cost Explorer to break down the costs of the resources in the stack you're deploying.
                </AlertDescription>
                <AlertDescription>
                    The costs may be approximate, and they may not be displayed if you have an account with a large number of resources. You will only be able to see the resources associated with the stack generated in Brender Studio, not those of the entire account.
                </AlertDescription>
            </div>
        </Alert>
    )
}

export default CostExplorerInfo