import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CustomTooltip } from "../../tooltip/CustomTooltip";
import CustomLegend from "../../legend/CustomLegend";
import { nameMapping, serviceColorMap } from "@/lib/cost-explorer-utils/charts-utils/serviceColors";
import { getCostByService } from "@/features/cost-explorer/charts/helpers/areaChartHelper";
import { AreaChartCompProps } from "@/features/cost-explorer/costExplorerTypes";


export const AreaChartComp = ({ averageData, services, processedData }: AreaChartCompProps) => (

    <ResponsiveContainer width="100%" height={450}>
        <AreaChart data={averageData} margin={{ top: 1, right: 0, left: 0, bottom: 5 }}>
            <CartesianGrid opacity={0.2} vertical={false} />
            <XAxis dataKey="date" opacity={0.5} axisLine={false} tickLine={false} dy={10} fontSize={12} />
            <YAxis opacity={0.5} axisLine={false} tickLine={false} fontSize={12} />
            <Tooltip cursor={{ fill: "transparent" }} content={<CustomTooltip />} />
            <Legend verticalAlign="top" content={<CustomLegend services={services} />} />
            <defs>
                {services.map((service, index) => {
                    const originalServiceName = Object.keys(nameMapping).find((key) => nameMapping[key] === service);
                    const colorService = serviceColorMap[originalServiceName!];
                    return (
                        <linearGradient
                            id={`color-${index}`}
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="1"
                            key={index}
                        >
                            <stop offset="5%" stopColor={colorService} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={colorService} stopOpacity={0} />
                        </linearGradient>
                    );
                })}
            </defs>
            {services.map((service, index) => (
                <Area
                    key={index}
                    type="monotone"
                    dataKey={(entry: { date: string }) => getCostByService(processedData, entry.date, service)}
                    name={service}
                    dot={false}
                    stackId={index}
                    stroke={`url(#color-${index})`}
                    fill={`url(#color-${index})`}
                />
            ))}
        </AreaChart>
    </ResponsiveContainer>
);
