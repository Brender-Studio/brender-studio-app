import {  BarChartsSectionProps } from "@/features/cost-explorer/costExplorerTypes";
import BarChartComp from "./BarChart";
import { NoResults } from "@/features/cost-explorer/charts/helpers/LoadingAndError";


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
