import { homeData } from "./data/homeData"
import HomeCard from "@/components/custom/cards/HomeCard"


const SupportSection = () => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {homeData[2].data.map((data, index) => (
                <HomeCard key={index} data={data} />
            ))}
        </div>
    )
}

export default SupportSection