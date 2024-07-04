import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { nameMapping, serviceColorMap } from "@/lib/cost-explorer-utils/charts-utils/serviceColors";

export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    // console.log("CustomTooltip", payload);
    const tooltipContent = payload.map((item: any, index: number) => {
      const name = item.name;
      const formattedCost = item.value.toFixed(4);
      const serviceName = Object.keys(nameMapping).find(key => nameMapping[key] === name) || 'Servicio Desconocido';
      // console.log("ServiceName", serviceName);
      const colorService = serviceColorMap[serviceName!];

      return (
        <div key={index} className="w-full grid grid-cols-2 items-center justify-between gap-8 mt-2">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full"
                style={{ backgroundColor: colorService }}
              ></div>
              <div className="text-xs  ">
                <span className="text-white/80 font-semibold">
                  {name && name}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <span className="text-muted-foreground text-xs"> {name && formattedCost ? `${formattedCost}$` : null}</span>
          </div>
        </div>
      );
    });

    const totalCost = payload.reduce((acc: number, item: any) => {
      return acc + (item.value);
    }, 0);

    return (
      <div className="custom-tooltip px-6">
        <Card className="w-full bg-tooltip rounded-sm">
          <div className="flex items-start justify-center flex-col text-center">
            {label &&
              <>
                <p className="label text-xs text-white/80 font-semibold  px-4 pt-2">{label}</p>
                <Separator className=" my-1 h-px bg-muted" />
              </>
            }
          </div>
          <div>
            <div className="px-4 ">
              {tooltipContent}
            </div>
            <Separator className=" my-1 h-px bg-muted" />
            <div className="text-xs px-4 pt-2 pb-2 flex items-center justify-start ">
              <span className="text-white/80 font-semibold">
                Total Cost:
              </span>
              <span className="text-muted-foreground ml-2">{totalCost.toFixed(6)}$</span>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return null;
};