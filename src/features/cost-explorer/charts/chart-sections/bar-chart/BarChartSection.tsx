import BarChartComp from "./BarChart";
import { NoResults } from "@/features/cost-explorer/charts/helpers/LoadingAndError";

interface BarChartsSectionProps {
    barData: any;
    services: any
}


const BarChartsSection = ({ barData, services }: BarChartsSectionProps) => {


    if (!barData) {
        return <NoResults />;
    }

    return barData.length > 0 && services.length > 0 ? (
        <BarChartComp
            barData={barData}
            services={services}
        />
    ) : (
        <NoResults />
    );
};

export default BarChartsSection;
