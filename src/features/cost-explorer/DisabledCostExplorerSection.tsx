import { Button } from "@/components/ui/button"
import CostExplorerInfo from "./charts/helpers/CostExplorerInfo"
import { useSectionActiveStore } from "@/store/useSectionActiveStore"

const DisabledCostExplorerSection = () => {
    const { setSectionActive } = useSectionActiveStore()
    return (
        <>
            <div>
                <CostExplorerInfo />
            </div>
            <div className="w-full flex flex-col justify-center items-center h-[50vh]">
                <div className="flex items-center justify-center">
                    <Button onClick={() => {
                        setSectionActive(true)
                    }} className="mx-auto">
                        Enable Cost Explorer
                    </Button>
                </div>
            </div>
        </>
    )
}

export default DisabledCostExplorerSection