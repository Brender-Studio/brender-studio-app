import { DateRange } from "react-day-picker"
import { SelectDatePickerRange } from "../../date-picker/SelectDatePickerRange"
import SelectChart from "../SelectChart"
import CumulativeTotalCost from "./CumulativeTotalCost"


interface HeaderChartSectionProps {
  handleDateChange: (newDateRange: DateRange | undefined) => void
  isFetching: boolean
  selectedTypeChart: string
  handleChangeTypeChart: (typeChart: string) => void
  isLoading: boolean
  totalCost: number
}

const HeaderChartSection = ({ handleChangeTypeChart, handleDateChange, isFetching, isLoading, selectedTypeChart, totalCost }: HeaderChartSectionProps) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="p-0">
          <SelectDatePickerRange
            handleDateChange={handleDateChange}
            isFetching={isFetching}
          />
        </div>
        <SelectChart
          selectedTypeChart={selectedTypeChart}
          handleChangeTypeChart={handleChangeTypeChart}
        />
      </div>
      <CumulativeTotalCost
        isLoading={isLoading}
        totalCost={totalCost}
      />
    </>
  )
}

export default HeaderChartSection