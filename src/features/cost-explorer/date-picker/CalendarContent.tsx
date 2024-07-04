import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

export function CalendarContent({ tempDateRange, onChange }: {
    tempDateRange: DateRange | undefined,
    onChange: (newDate: DateRange | undefined) => void
}) {
    return (
        <Calendar
            initialFocus
            mode="range"
            defaultMonth={tempDateRange?.from}
            selected={tempDateRange}
            onSelect={onChange}
            numberOfMonths={2}
            className="w-auto pb-0 px-4"
            disabled={{ after: new Date()}}
        />
    );
}