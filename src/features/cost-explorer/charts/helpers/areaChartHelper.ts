import { ProcessedDataChartProps, ServiceCostData } from "../../costExplorerTypes";

// Helper function to calculate average costs
export const calculateAverageCosts = (
  processedData: ProcessedDataChartProps
): { date: string; average: number }[] => {
  return Object.entries(processedData).map(([date, entries]) => {
    const totalCost = entries.reduce((acc, { cost }) => acc + cost, 0);
    const average = totalCost / entries.length;
    return { date, average };
  });
};

// Helper function to get unique services
export const getUniqueServices = (
  processedData: ProcessedDataChartProps
): string[] => {
  return Array.from(
    new Set(
      Object.values(processedData).flat().map((entry: ServiceCostData) => entry.service)
    )
  );
};

// Helper function to get cost by service
export const getCostByService = (
  processedData: ProcessedDataChartProps,
  date: string,
  service: string
): number => {
  const entries = processedData[date];
  if (!entries) return 0;

  const entry = entries.find((d: ServiceCostData) => d.service === service);
  return entry?.cost || 0;
};

// Helper function to calculate total cost
export const calculateTotalCost = (
  processedData: ProcessedDataChartProps
): number => {
  let totalCost = 0;

  Object.values(processedData).forEach((day: ServiceCostData[]) => {
    day.forEach((entry: ServiceCostData) => {
      if (entry.cost) {
        totalCost += parseFloat(entry.cost.toString());
      }
    });
  });

  return totalCost;
};
