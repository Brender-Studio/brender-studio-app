import HomeCard from "@/components/custom/cards/HomeCard"
import { homeData } from './data/homeData'

const SponsorSection = () => {
    return (
        <div className="grid grid-cols-2 gap-4">
            {homeData[3].data.map((data, index) => (
                <HomeCard key={index} data={data} />
            ))}
        </div>
    )
}

export default SponsorSection