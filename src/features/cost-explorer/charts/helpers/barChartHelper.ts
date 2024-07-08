// // barChartHelper.ts
// export const calculateBarData = (processedData: Record<string, any[]>): any[] => {
//     return Object.keys(processedData).map((date) => {
//       const dataForDate = processedData[date];
//       const dataObj: Record<string, any> = { date };
//       dataForDate.forEach((entry: any) => {
//         dataObj[entry.service] = entry.cost;
//       });
//       return dataObj;
//     });
//   };

import { BarChartData, ProcessedDataChartProps, ServiceCostData } from "../../costExplorerTypes";

  
//   export const getUniqueServices = (processedData: Record<string, any[]>): string[] => {
//     return Array.from(new Set(Object.values(processedData).flat().map((entry: any) => entry.service)));
//   };
  


// Helper function to calculate bar data
export const calculateBarData = (
  processedData: ProcessedDataChartProps
): BarChartData[] => {
  return Object.keys(processedData).map((date) => {
    const dataForDate = processedData[date];
    const dataObj: BarChartData = { name: date };
    dataForDate.forEach((entry: ServiceCostData) => {
      dataObj[entry.service] = entry.cost;
    });
    return dataObj;
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
