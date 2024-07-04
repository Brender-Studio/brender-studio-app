import { ProccesedDataChartProps } from "@/features/cost-explorer/costExplorerTypes";
import { nameMapping, serviceColorMap } from "./serviceColors";

export const processDataChart = (results: any) => {
    if (!results || results.length === 0) {
        console.error('No results found or results is empty');
        return null;
    }
    console.log('Results: ', results);

    const processedData: ProccesedDataChartProps = {};

    results.forEach((result: any) => {
        const startDate = result.TimePeriod.Start;

        if (!Array.isArray(result.Groups)) {
            console.error('result.Groups no es un Array:', result.Groups);
            return;
        }

        result.Groups.forEach((group: any) => {
            const originalServiceName = group.Keys[0];
            // console.log('OriginalServiceName', originalServiceName);

            if (nameMapping.hasOwnProperty(originalServiceName)) {
                const serviceName = nameMapping[originalServiceName];
                const cost = Number(group.Metrics.BlendedCost.Amount);
                const color = serviceColorMap[originalServiceName];

                if (!processedData[startDate]) {
                    processedData[startDate] = [];
                }

                processedData[startDate].push({
                    service: serviceName,
                    cost: cost,
                    color: color
                });

            }
        });
    });

    // console.log('ProcessedData: ', processedData);
    return processedData;
};
