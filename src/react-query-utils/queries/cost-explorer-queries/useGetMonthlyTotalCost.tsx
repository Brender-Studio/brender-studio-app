import { getMonthlyTotalCost } from "@/cli-functions/cost-explorer-data/getMonthlyTotalCost";
import { ColumnsTableExplorerProps } from "@/features/cost-explorer/costExplorerTypes";
import { nameMapping } from "@/lib/cost-explorer-utils/charts-utils/serviceColors";
import { calculateTotalCostByService } from "@/lib/cost-explorer-utils/table-utils/calculateTotalCost";
import { costExplorerQueries } from "@/react-query-utils/query-key-store/queryKeyStore";
import { useDateRangeStore } from "@/store/useDateRangeStore";
import { useSectionActiveStore } from "@/store/useSectionActiveStore";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";


const useGetMonthlyTotalCost = () => {
    const { currentStack, currentProfile, currentAwsRegion } = useUserSessionStore((state) => state.getSessionData());
    const { costExplorerMonthlyQueryKey } = costExplorerQueries;
    const { selectedDateRange } = useDateRangeStore();
    const { isSectionActive } = useSectionActiveStore();

    const startDate = selectedDateRange?.from ? format(selectedDateRange.from, "yyyy-MM-dd") : '';
    const endDate = selectedDateRange?.to ? format(selectedDateRange.to, "yyyy-MM-dd") : '';
    const enableQuery = !!currentProfile && !!currentStack && !!startDate && !!endDate && isSectionActive;

    const monthlyCostQuery = useQuery({
        queryKey: costExplorerMonthlyQueryKey(currentProfile!, currentAwsRegion!, currentStack!),
        queryFn: () => getMonthlyTotalCost(currentProfile!, currentAwsRegion, currentStack!, startDate, endDate),
        enabled: enableQuery
    });

    let totalCostByService: { [key: string]: number } = {};
    let formattedData: ColumnsTableExplorerProps[] = [];

    if (monthlyCostQuery.isSuccess && monthlyCostQuery.data?.ResultsByTime) {
        totalCostByService = calculateTotalCostByService(monthlyCostQuery.data.ResultsByTime);

        formattedData = Object.keys(totalCostByService)
            .filter(serviceName => serviceName in nameMapping)
            .map(serviceName => ({
                Service: serviceName,
                Monthly: startDate && endDate ? `${format(new Date(startDate), 'LLL dd, yyyy')} - ${format(new Date(endDate), 'LLL dd, yyyy')}` : "-",
                Amount: totalCostByService[serviceName].toFixed(2),
                deepLink: `https://${currentAwsRegion}.console.aws.amazon.com/cost-management/home?region=${currentAwsRegion}#/cost-explorer?chartStyle=STACK&costAggregate=unBlendedCost&endDate=${endDate}&excludeForecasting=false&filter=%5B%7B%22dimension%22:%7B%22id%22:%22Service%22,%22displayValue%22:%22Servicio%22%7D,%22operator%22:%22INCLUDES%22,%22values%22:%5B%7B%22value%22:%22${encodeURIComponent(serviceName)}%22%7D%5D%7D%5D&futureRelativeRange=CUSTOM&granularity=Monthly&groupBy=%5B%22Service%22%5D&historicalRelativeRange=LAST_6_MONTHS&isDefault=true&reportName=Cost%20Explorer%20Report&startDate=${startDate}`,
            }));
    }

    return {
        ...monthlyCostQuery, formattedData
    }
}

export default useGetMonthlyTotalCost