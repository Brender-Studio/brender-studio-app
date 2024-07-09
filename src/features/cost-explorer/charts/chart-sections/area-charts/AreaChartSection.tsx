import { NoResults } from "@/features/cost-explorer/charts/helpers/LoadingAndError";
import { AreaChartComp } from "./AreaChart";
import { AreaChartData, AreaChartsSectionProps } from "@/features/cost-explorer/costExplorerTypes";


const AreaCharts = ({ areaChartData, processedData, services }: AreaChartsSectionProps) => {

    if (!areaChartData) return null;

    if (!processedData) return <NoResults />;

    const hasValidData = areaChartData.some((data: AreaChartData) => 
        Object.values(data).some(value => typeof value === 'number' && !isNaN(value))
    );

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
