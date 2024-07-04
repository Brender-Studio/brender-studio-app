import { DateRange } from "react-day-picker";
import { Popover } from "@/components/ui/popover";
import { useDateRangeStore } from "@/store/useDateRangeStore";
import { SelectDatePickerRangeProps } from "../costExplorerTypes";
import { useEffect, useState } from "react";
import { onApplyDateRange, onClearDateRange } from "./datePickerRangeFunction";
import { DatePickerTrigger } from "./DatePickerTrigger";
import { PopoverContentWrapper } from "./PopoverContentWrapper";


export function SelectDatePickerRange({ handleDateChange, isFetching }: SelectDatePickerRangeProps) {
    const { selectedDateRange, setSelectedDateRange, clearSelectedDateRange } = useDateRangeStore();

    const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>({
        from: selectedDateRange?.from,
        to: selectedDateRange?.to
    });
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const onChange = (newDate: DateRange | undefined) => {
        setTempDateRange(newDate);
        handleDateChange(tempDateRange);
    };

    const onApply = () => onApplyDateRange(tempDateRange, setSelectedDateRange);
    const onClear = () => onClearDateRange(setTempDateRange, clearSelectedDateRange);

    useEffect(() => {
        if (!isFetching) {
            setTimeout(() => {
                setIsPopoverOpen(false);
            }, 500);
        }
    }, [isFetching]);

    return (
        <Popover open={isPopoverOpen}>
            <DatePickerTrigger
                tempDateRange={tempDateRange}
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            />
            <PopoverContentWrapper
                isFetching={isFetching}
                tempDateRange={tempDateRange}
                onChange={onChange}
                onApply={onApply}
                onClear={onClear}
            />
        </Popover>
    );
}
