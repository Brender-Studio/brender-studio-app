
interface MonthlyCost {
    [service: string]: { [month: string]: string };
}

const groupCostsByServiceAndMonth = (data: any[]): MonthlyCost => {
    const monthlyCosts: MonthlyCost = {};

    data.forEach((item: any) => {
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

const getMonthsList = (data: any[]): string[] => {
    const months: Set<string> = new Set();

    data.forEach((item: any) => {
        months.add(item.Monthly);
    });

    return Array.from(months);
};

// const createCostTable = (monthlyCosts: MonthlyCost, monthsList: string[]): any[] => {
//     const table: any[] = [];

//     // Agregar encabezados de columnas
//     const headerRow = ["Service", "Total Cost"];
//     monthsList.forEach(month => {
//         headerRow.push(month);
//     });
//     table.push(headerRow);

//     for (const service in monthlyCosts) {
//         const serviceRow: any[] = [service];
//         let serviceTotalCost = 0;

//         for (let i = 0; i < monthsList.length; i++) {
//             const month = monthsList[i];
//             const cost = monthlyCosts[service][month] || "0";
//             serviceRow.push(cost);
//             serviceTotalCost += parseFloat(cost);
//         }

//         serviceRow.splice(1, 0, serviceTotalCost.toFixed(2));
//         table.push(serviceRow);
//     }

//     return table;
// };
