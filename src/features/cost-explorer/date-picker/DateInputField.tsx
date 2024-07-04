import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";



interface DateInputFieldProps {
    label: string;
    value: string;
    onChange: (date: Date) => void;
}


export function DateInputField({ label, value, onChange }: DateInputFieldProps) {
    return (
        <div className="flex-1">
            <Label>{label}</Label>
            <Input
                disabled
                className="rounded-sm"
                value={value}
                onChange={(e) => {
                    const newDate = new Date(e.target.value);
                    onChange(newDate);
                }}
            />
        </div>
    );
}