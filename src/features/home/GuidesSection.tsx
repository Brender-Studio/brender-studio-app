import HomeCard from "@/components/custom/cards/HomeCard"
import { homeData } from "./data/homeData"

const GuidesSection = () => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {homeData[1].data.map((data, index) => (
                <HomeCard key={index} data={data} />
            ))}
        </div>
    )
}

export default GuidesSection