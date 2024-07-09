import { ResultByTime, GroupsCostServices } from "@/features/cost-explorer/costExplorerTypes";

export const calculateTotalCostByService = (data: ResultByTime[]): { [key: string]: number } => {
    const totalCostByService: { [key: string]: number } = {};

    if (data) {
        data.forEach(result => {
            if (!result || result.Groups.length === 0) {
                console.error('No results found or results is empty');
                return {};
            }
            result.Groups.forEach((group: GroupsCostServices) => {
                const serviceName = group?.Keys[0];
                const costAmount = parseFloat(group?.Metrics.BlendedCost?.Amount || '0');
                if (serviceName) {
                    totalCostByService[serviceName] = (totalCostByService[serviceName] || 0) + costAmount;
                }
            });
        });
    }

    return totalCostByService;
};
