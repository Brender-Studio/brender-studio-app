import { create } from "zustand";
import { DateRange } from "react-day-picker";

interface DateRangeStoreProps {
  selectedDateRange: DateRange | undefined;
  setSelectedDateRange: (dateRange: DateRange | undefined) => void;
  clearSelectedDateRange: () => void;
}

export const useDateRangeStore = create<DateRangeStoreProps>((set) => {
  const currentDay = new Date();
  // const fromDate = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() - 7);
  const fromDate = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1);
  const end = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate());

  return {
    selectedDateRange: {
      from: fromDate,
      to: end,
    },
    setSelectedDateRange: (range) => set({ selectedDateRange: range }),
    clearSelectedDateRange: () => set({ selectedDateRange: undefined }),
  };
});
