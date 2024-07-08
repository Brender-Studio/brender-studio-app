import { getDailyTotalCost } from "@/cli-functions/cost-explorer-data/getDailyTotalCost";
import { calculateAverageCosts, calculateTotalCost, getUniqueServices } from "@/features/cost-explorer/charts/helpers/areaChartHelper";
import { calculateBarData } from "@/features/cost-explorer/charts/helpers/barChartHelper";
import { AreaChartData, BarChartData, ProcessedDataChartProps, UseDailyTotalCostResult } from "@/features/cost-explorer/costExplorerTypes";
import { processDataChart } from "@/lib/cost-explorer-utils/charts-utils/proccesDataChart";
import { costExplorerQueries } from "@/react-query-utils/query-key-store/queryKeyStore";
import { useDateRangeStore } from "@/store/useDateRangeStore";
import { useSectionActiveStore } from "@/store/useSectionActiveStore";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";



const useGetDailyTotalCost = (): UseDailyTotalCostResult => {
    const { currentStack, currentProfile, currentAwsRegion } = useUserSessionStore((state) => state.getSessionData());
    const { costExplorerDailyQueryKey } = costExplorerQueries;
    const { selectedDateRange } = useDateRangeStore();
    const { isSectionActive } = useSectionActiveStore();



    const startDate = selectedDateRange?.from ? format(selectedDateRange.from, "yyyy-MM-dd") : '';
    const endDate = selectedDateRange?.to ? format(selectedDateRange.to, "yyyy-MM-dd") : '';
    const enableQuery = !!currentProfile && !!currentStack && !!startDate && !!endDate && isSectionActive;

    const dailyCostQuery = useQuery({
        queryKey: costExplorerDailyQueryKey(currentProfile!, currentAwsRegion!, currentStack!),
        queryFn: () => getDailyTotalCost(currentProfile!, currentAwsRegion!, currentStack!, startDate, endDate),
        enabled: enableQuery,
    });

    const linkAWSDailyConsole = `https://console.aws.amazon.com/cost-reports/home?region=${currentAwsRegion}#/dashboard?reportName=${currentStack}+Cost+Explorer&timePeriod.start=${startDate}&timePeriod.end=${endDate}&granularity=MONTHLY&groupBy=SERVICE`;


    let processedDataCharts: ProcessedDataChartProps | null = null;
    let barChartData: BarChartData[] | undefined;
    let areaChartData: AreaChartData[] | undefined;
    let totalCost = 0;
    let services: string[] | undefined;

    if (dailyCostQuery.isSuccess && dailyCostQuery.data?.ResultsByTime) {
        console.log('Results data: ', dailyCostQuery.data?.ResultsByTime);
        processedDataCharts = processDataChart(dailyCostQuery.data?.ResultsByTime);

        if (processedDataCharts && Object.keys(processedDataCharts).length > 0) {
            barChartData = calculateBarData(processedDataCharts);
            areaChartData = calculateAverageCosts(processedDataCharts);
            totalCost = calculateTotalCost(processedDataCharts);
            services = getUniqueServices(processedDataCharts);
        }
    }

    return {
        ...dailyCostQuery,
        linkAWSDailyConsole,
        processedDataCharts,
        services,
        totalCost,
        barChartData,
        areaChartData
    }

}

export default useGetDailyTotalCost