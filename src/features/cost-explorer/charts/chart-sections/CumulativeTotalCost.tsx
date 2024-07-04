import { CumulativeTotalCostSkeleton } from "@/components/custom/skeletons/SkeletonCostExplorer";
import TooltipInfo from "@/components/custom/tooltip/TooltipInfo";
import { Separator } from "@/components/ui/separator";

interface CumulativeTotalCostProps {
  totalCost: number;
  isLoading: boolean;
}

const CumulativeTotalCost = ({ isLoading, totalCost }: CumulativeTotalCostProps) => {
  const averageCost = totalCost / 30;
  const hasDecimals = averageCost !== Math.floor(averageCost);
  const formattedAverageCost = hasDecimals ? averageCost.toFixed(4) : averageCost.toFixed(2);

  if (isLoading) {
    return <CumulativeTotalCostSkeleton />;
  }


  return (
    <div className="pt-4 flex items-center justify-center gap-4">
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-2 pb-2">
          <p className="text-muted-foreground font-medium text-sm">Total Cost</p>
          <TooltipInfo title="Total Cost" description="The total cost in the selected date range." />
        </div>
        <p className="font-normal text-4xl">{`$${totalCost.toFixed(2)}`}</p>
      </div>
      <Separator orientation="vertical" className="h-10 bg-muted-foreground opacity-50" />
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-2 pb-2">
          <p className="text-muted-foreground font-medium text-sm">Average Cost</p>
          <TooltipInfo title="Average Cost" description="The average cost per day in the selected date range." />
        </div>
        <p className="font-normal text-4xl">{`$${formattedAverageCost}`}</p>
      </div>
    </div>
  );
};

export default CumulativeTotalCost;
