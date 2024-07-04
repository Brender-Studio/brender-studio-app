import { DataTableCostExplorer } from "./DataTableCostExplorer";
import { columns } from "./columns";
import useGetMonthlyTotalCost from "@/react-query-utils/queries/cost-explorer-queries/useGetMonthlyTotalCost";
import { useToast } from "@/components/ui/use-toast";
import DataTableHeader from "@/components/custom/structure/DataTableHeader";




const TableExplorer = () => {
    const { isLoading, isError, error, formattedData } = useGetMonthlyTotalCost();
    const { toast } = useToast();


    if (isError) {
        toast({
            title: "Error",
            description: error?.message || "An error occurred",
            variant: "destructive",
        });
    }


    return (
        <div>
            <DataTableHeader title="Cost and Usage Breakdown" description="This table shows the total cost and usage breakdown." />
            <DataTableCostExplorer isQueryLoading={isLoading} data={formattedData} columns={columns} />
        </div>

    );
};

export default TableExplorer;
