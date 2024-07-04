import HomeCard from "@/components/custom/cards/HomeCard"
import { homeData } from './data/homeData'

const GettingStartedSection = () => {
    return (
        <div className="grid grid-cols-3 gap-2">
            {homeData[0].data.map((data, index) => (
                <HomeCard key={index} data={data} />
            ))}
        </div>
    )
}

export default GettingStartedSection