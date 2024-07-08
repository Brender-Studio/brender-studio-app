import AreaChartSection from "./area-charts/AreaChartSection";
import BarChartsSection from "./bar-chart/BarChartSection";
import { useSelectedTypeChartStore } from "@/store/useSelectedTypeChartStore";
import { NoResults } from "../helpers/LoadingAndError";
import { SectionChartsSkeleton } from "@/components/custom/skeletons/SkeletonCostExplorer";
import { SectionChartsProps } from "../../costExplorerTypes";

const SectionCharts = ({
    areaChartData,
    barChartData,
    isLoading,
    services,
    processedDataCharts,
}: SectionChartsProps) => {

    const { selectedType } = useSelectedTypeChartStore();

    if (isLoading) {
        return <SectionChartsSkeleton />;
    }

    if (!processedDataCharts || !services || !barChartData || !areaChartData) {
        return <NoResults />;
    }

    return (
        <div className="flex justify-center">
            {selectedType === "bar" ? (
                <BarChartsSection
                    barData={barChartData}
                    services={services}
                />
            ) : (
                <AreaChartSection
                    areaChartData={areaChartData}
                    processedData={processedDataCharts}
                    services={services}
                />
            )}
        </div>
    );
};

export default SectionCharts;
