import { NoResults } from "@/features/cost-explorer/charts/helpers/LoadingAndError";
import { AreaChartComp } from "./AreaChart";

interface AreaChartsProps {
    areaChartData: any;
    services: any;
    processedData: any;
}


const AreaCharts = ({ areaChartData, processedData, services }: AreaChartsProps) => {

    if (!areaChartData) return null;

    if (!processedData) return <NoResults />;

    const hasValidData = areaChartData.some((data: { average: number }) => !isNaN(data.average));

    if (!hasValidData) {
        return <NoResults />;
    }

    return (
        <>
            <AreaChartComp
                averageData={areaChartData}
                services={services}
                processedData={processedData}
            />
        </>
    )
};

export default AreaCharts;
