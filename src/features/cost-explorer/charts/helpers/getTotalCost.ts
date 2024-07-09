// import { getCostByService } from "./areaChartHelper";

// export const getTotalCost = (data: any, services: string[], processedData: any): number => {
//     return data.reduce((total: number, entry: any) => {
//         let dailyCost = 0;
//         services.forEach((service) => {
//             dailyCost += getCostByService(processedData, entry.date, service);
//         });
//         return total + dailyCost;
//     }, 0);
// };


import { ProcessedDataChartProps } from '../../costExplorerTypes';
import { getCostByService } from './areaChartHelper';

export const getTotalCost = (
  data: { date: string }[],
  services: string[],
  processedData: ProcessedDataChartProps
): number => {
  return data.reduce((total: number, entry: { date: string }) => {
    let dailyCost = 0;
    services.forEach((service) => {
      dailyCost += getCostByService(processedData, entry.date, service);
    });
    return total + dailyCost;
  }, 0);
};
