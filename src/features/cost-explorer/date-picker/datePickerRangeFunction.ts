import { DateRange } from "react-day-picker";

// Validate if the date range is valid
export const isValidDateRange = (dateRange?: DateRange): boolean => {
    if (!dateRange || !dateRange.from || !dateRange.to) {
        return false;
    }
    return dateRange.from <= dateRange.to;
};


// Function to apply the date range selected
export const onApplyDateRange = (
    tempDateRange: DateRange | undefined,
    setSelectedDateRange: (dateRange: DateRange | undefined) => void
) => {
    if (isValidDateRange(tempDateRange)) {
        setSelectedDateRange({
            from: tempDateRange?.from,
            to: tempDateRange?.to,
        });
    }
};


export const onClearDateRange = (
    setTempDateRange: (dateRange: DateRange | undefined) => void,
    clearSelectedDateRange: () => void
) => {
    setTempDateRange(undefined);
    clearSelectedDateRange();
};
