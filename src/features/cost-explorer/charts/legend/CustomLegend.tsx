import { nameMapping, serviceColorMap } from "@/lib/cost-explorer-utils/charts-utils/serviceColors";

interface LegendProps {
    services: string[];
}

const CustomLegend = ({ services }: LegendProps) => {

    return (
        <div className="">
            <div className="flex items-center justify-center gap-6 m-auto pb-4">
                {services.map((service: string, index: number) => {
                    const originalServiceName = Object.keys(nameMapping).find(key => nameMapping[key] === service);
                    const colorService = serviceColorMap[originalServiceName!];
                    return (
                        <div key={index} className="flex items-center justify-center">
                            <div className={`w-2 h-2 mr-2 rounded-full flex items-center`} style={{ backgroundColor: colorService }} />
                            <span className="text-neutral-300 font-medium text-sm">
                                {nameMapping[originalServiceName!]}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CustomLegend;