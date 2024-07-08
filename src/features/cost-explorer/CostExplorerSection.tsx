import { useUserSessionStore } from "@/store/useSessionStore"
import SectionCostExplorer from "./charts/structure/SectionCostExplorer"
import CostExplorerInfo from "./charts/helpers/CostExplorerInfo"
import TableExplorer from "./table-explorer/TableExplorer"
import { useDateRangeStore } from "@/store/useDateRangeStore"
import { DateRange } from "react-day-picker"
import { useSectionActiveStore } from "@/store/useSectionActiveStore"
import SectionCharts from "./charts/chart-sections/SectionCharts"
import useGetDailyTotalCost from "@/react-query-utils/queries/cost-explorer-queries/useGetDailyTotalCost"
import CostExplorerHeader from "./CostExplorerHeader"
import HeaderChartSection from "./charts/chart-sections/HeaderChartSection"
import { useSelectedTypeChartStore } from "@/store/useSelectedTypeChartStore"
import TitleChartSection from "./TitleChartSection"
import NoStackSelected from "@/components/custom/no-data/NoStackSelected"
import DisabledCostExplorerSection from "./DisabledCostExplorerSection"
import { toast } from '@/components/ui/use-toast';

const CostExplorerSection = () => {
  const { currentStack } = useUserSessionStore((state) => state.getSessionData());

  const { setSelectedDateRange } = useDateRangeStore();
  const { isSectionActive, setSectionActive } = useSectionActiveStore();
  const { selectedType, setSelectedType } = useSelectedTypeChartStore();

  const {
    isLoading,
    isError,
    error,
    isFetching,
    linkAWSDailyConsole,
    totalCost,
    barChartData,
    areaChartData,
    services,
    processedDataCharts
  } = useGetDailyTotalCost();

  if (isError && error instanceof Error) {
    toast({
      title: 'Error',
      description: error.message,
      variant: 'destructive'
    });
  }

  const handleDateChange = (newDateRange: DateRange | undefined) => {
    setSelectedDateRange(newDateRange);
  };

  const handleSwitchChange = () => {
    setSectionActive(!isSectionActive);
  };

  const handleChangeTypeChart = (selectedType: string) => {
    setSelectedType(selectedType);
  };

  return (
    <div>
      <CostExplorerHeader
        linkAWSDailyConsole={linkAWSDailyConsole}
        description={`Cost Explorer for your AWS account. It displays usage and cost report.`}
        isSectionActive={isSectionActive}
        onSwitchChange={handleSwitchChange}
      />

      {isSectionActive ? (
        currentStack ? (
          <>
            <SectionCostExplorer
              cardTitle={
                <TitleChartSection
                  currentStack={currentStack}
                />
              }
              cardHeader={
                <HeaderChartSection
                  handleChangeTypeChart={handleChangeTypeChart}
                  handleDateChange={handleDateChange}
                  isFetching={isFetching}
                  isLoading={isLoading}
                  selectedTypeChart={selectedType}
                  totalCost={totalCost}
                />
              }
              cardContent={
                <SectionCharts
                  processedDataCharts={processedDataCharts}
                  services={services}
                  isLoading={isLoading}
                  areaChartData={areaChartData}
                  barChartData={barChartData}
                />
              }
              tableSection={<TableExplorer />}
            />
            <div>
              <CostExplorerInfo />
            </div>
          </>
        ) : (
          <NoStackSelected />
        )
      ) : (
        <DisabledCostExplorerSection />
      )}
    </div>
  );
};

export default CostExplorerSection;