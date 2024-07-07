
import SpinnerButton from "@/components/custom/spinners/SpinnerButton";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface Progress {
  [key: string]: boolean;
}

const ProgressList = ({ progress }: { progress: Progress }) => {
  return (
    <Card className="p-4">
      {Object.entries(progress).map(([step, completed]) => (
        <div key={step} className="text-muted-foreground text-sm mt-2">
          {completed ? (
            <div className="flex items-center gap-2">
              <span className="bg-green-500 rounded-full p-1 transition-colors duration-700">
                <Check size={10} className="text-white" strokeWidth={4} />
              </span>
              {step}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <SpinnerButton />
              {step}
            </div>
          )}
        </div>
      ))}
    </Card>
  );
};

export default ProgressList;
