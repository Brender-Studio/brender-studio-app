import { ProcessedDataChartProps, ResultByTime, ServiceCostData } from "@/features/cost-explorer/costExplorerTypes";
import { nameMapping, serviceColorMap } from "./serviceColors";

export const processDataChart = (results: ResultByTime[]): ProcessedDataChartProps | null => {
    if (!results || results.length === 0) {
        console.error('No results found or results is empty');
        return null;
    }
    // console.log('Results: ', results);

    const processedData: ProcessedDataChartProps = {};

    results.forEach((result: ResultByTime) => {
        const startDate = result.TimePeriod.Start;

        if (!Array.isArray(result.Groups)) {
            console.error('result.Groups no es un Array:', result.Groups);
            return;
        }

        result.Groups.forEach((group) => {
            const originalServiceName = group.Keys[0];

            if (nameMapping.hasOwnProperty(originalServiceName)) {
                const serviceName = nameMapping[originalServiceName];
                const cost = Number(group.Metrics.BlendedCost.Amount);
                const color = serviceColorMap[originalServiceName];

                if (!processedData[startDate]) {
                    processedData[startDate] = [];
                }

                const serviceCostData: ServiceCostData = {
                    service: serviceName,
                    cost: cost,
                    color: color
                };

                processedData[startDate].push(serviceCostData);
            }
        });
    });

    return processedData;
};
