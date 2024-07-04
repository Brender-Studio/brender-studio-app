import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SpinnerButton from "@/components/custom/spinners/SpinnerButton";
import { DateInputField } from "./DateInputField";
import { CalendarContent } from "./CalendarContent";
import { PopoverContent } from "@/components/ui/popover";

interface PopoverContentWrapperProps {
    tempDateRange?: DateRange;
    onChange: (dateRange?: DateRange) => void;
    onApply: () => void;
    onClear: () => void;
    isFetching: boolean;
}

export const PopoverContentWrapper = ({
    tempDateRange,
    onChange,
    onApply,
    onClear,
    isFetching,
}: PopoverContentWrapperProps) => (
    <PopoverContent className="w-auto" align="start">
        <CalendarContent
            tempDateRange={tempDateRange}
            onChange={onChange}
        />
        <div className="flex flex-col gap-2 mt-4 px-4">
            <div className="flex justify-between mb-4 gap-4 w-full">
                <DateInputField
                    label="Start Date"
                    value={tempDateRange?.from ? format(tempDateRange?.from, "yyyy-MM-dd") : ""}
                    onChange={(newStart) => {
                        const newRange = { ...tempDateRange, from: newStart };
                        onChange(newRange);
                    }}
                />

                <DateInputField
                    label="End Date"
                    value={tempDateRange?.to ? format(tempDateRange?.to, "yyyy-MM-dd") : ""}
                    onChange={(newEnd) => {
                        const newRange = { from: tempDateRange?.from, to: newEnd };
                        onChange(newRange);
                    }}
                />
            </div>
        </div>
        <Separator className="w-full" />
        <div className="flex items-center justify-end gap-2">
            <Button
                size="md"
                variant="ghost"
                className="mt-4 w-1/4"
                onClick={onClear}
            >
                Clear
            </Button>
            <Button
                disabled={!tempDateRange?.from || !tempDateRange?.to && isFetching}
                variant="secondary"
                size="md"
                className="mt-4 rounded-sm gap-2 w-1/4"
                onClick={onApply}
            >
                {isFetching ? (
                    <>
                        <SpinnerButton />
                        Applying...
                    </>
                ) : (
                    <>
                        Apply
                    </>
                )}
            </Button>
        </div>
    </PopoverContent>
);
