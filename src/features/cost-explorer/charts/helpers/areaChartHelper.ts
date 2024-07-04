export const calculateAverageCosts = (processedData: Record<string, any[]>): { date: string; average: number }[] => {
  return Object.entries(processedData).map(([date, entries]) => {
    const totalCost = entries.reduce((acc, { cost }) => acc + cost, 0);
    const average = totalCost / entries.length;
    return { date, average };
  });
};

// Helper function to get unique services
export const getUniqueServices = (processedData: Record<string, any[]>): string[] => {
  return Array.from(
    new Set(
      Object.values(processedData).flat().map((entry: any) => entry.service)
    )
  );
};

// Helper function to get cost by service
export const getCostByService = (processedData: Record<string, any[]>, date: string, service: string): number => {
  const entries = processedData[date];
  if (!entries) return 0;

  const entry = entries.find((d: any) => d.service === service);
  return entry?.cost || 0;
};

export const calculateTotalCost = (processedData: Record<string, any[]>): number => {
  let totalCost = 0;

  Object.values(processedData).forEach((day: any[]) => {
    day.forEach((entry: any) => {
      if (entry.costs) {
        entry.costs.forEach((cost: any) => {
          totalCost += parseFloat(cost.amount);
        });
      } else if (entry.cost) {
        totalCost += parseFloat(entry.cost);
      }
    });
  });

  return totalCost;
};
