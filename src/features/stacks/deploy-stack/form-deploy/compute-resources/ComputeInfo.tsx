import WarnAlert from "@/components/custom/alerts/WarnAlert"
import { computeDataSection } from "./computeData"


const ComputeInfo = () => {
    return (
        <WarnAlert
            className="my-4"
            variant="info"
            title={computeDataSection.infoTitle}
            description={computeDataSection.infoDescription}
            contentDescription={<div className="my-2">
                <p>{computeDataSection.infoExample}</p>
                <p className="my-2">{computeDataSection.infoExample2}</p>
            </div>
            }
        />
    )
}

export default ComputeInfo