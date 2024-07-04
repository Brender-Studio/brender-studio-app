// barChartHelper.ts
export const calculateBarData = (processedData: Record<string, any[]>): any[] => {
    return Object.keys(processedData).map((date) => {
      const dataForDate = processedData[date];
      const dataObj: Record<string, any> = { date };
      dataForDate.forEach((entry: any) => {
        dataObj[entry.service] = entry.cost;
      });
      return dataObj;
    });
  };
  
  export const getUniqueServices = (processedData: Record<string, any[]>): string[] => {
    return Array.from(new Set(Object.values(processedData).flat().map((entry: any) => entry.service)));
  };
  