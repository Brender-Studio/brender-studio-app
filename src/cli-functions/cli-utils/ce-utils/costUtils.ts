

interface CostItem {
    Service: string;
    Monthly: string;
    TotalCost: string;
}


interface CostAndUsageResponse {
    ResultsByTime: {
        TimePeriod: {
            Start: string;
            End: string;
        };
        Groups: {
            Keys: string[];
            Metrics: {
                BlendedCost: {
                    Amount: string;
                    Unit: string;
                };
            };
        }[];
    }[];
}


interface MonthlyCost {
    [service: string]: { [month: string]: string };
}

const groupCostsByServiceAndMonth = (data: CostItem[]): MonthlyCost => {
    const monthlyCosts: MonthlyCost = {};

    data.forEach((item: CostItem) => {
        const service = item.Service;
        const monthly = item.Monthly;
        const totalCost = item.TotalCost;

        if (!monthlyCosts[service]) {
            monthlyCosts[service] = {};
        }

        monthlyCosts[service][monthly] = totalCost;
    });

    return monthlyCosts;
};

const getMonthsList = (data: CostItem[]): string[] => {
    const months: Set<string> = new Set();

    data.forEach((item: CostItem) => {
        months.add(item.Monthly);
    });

    return Array.from(months);
};
