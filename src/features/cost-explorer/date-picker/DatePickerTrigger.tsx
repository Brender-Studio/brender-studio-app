import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { PopoverTrigger } from "@radix-ui/react-popover";

interface DatePickerTriggerProps {
    onClick?: () => void;
    tempDateRange?: DateRange;
}

export const DatePickerTrigger = ({ onClick, tempDateRange}: DatePickerTriggerProps) => (
    <PopoverTrigger asChild>
        <Button
            id="date"
            variant={"outline"}
            onClick={onClick}
            className={cn("justify-start text-left font-normal", !tempDateRange && "text-muted-foreground")}
        >
            <CalendarIcon size={16} className="mr-2" />
            {tempDateRange?.from && tempDateRange.to ? (
                <>
                    {format(tempDateRange.from, "LLL dd, yyyy")} -{" "}
                    {format(tempDateRange.to, "LLL dd, yyyy")}
                </>
            ) : (
                <span>Pick a Date</span>
            )}
        </Button>
    </PopoverTrigger>
);
