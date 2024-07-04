import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import CustomLegend from "../../legend/CustomLegend";
import { serviceColorMap, nameMapping } from "@/lib/cost-explorer-utils/charts-utils/serviceColors";
import { CustomTooltip } from '../../tooltip/CustomTooltip';

interface BarChartCompProps {
    barData: any[];
    services: string[];
}

const BarChartComp = ({ barData, services }: BarChartCompProps) => (
    <ResponsiveContainer width="100%" height={450}>
        <BarChart data={barData} barSize={30} margin={{ top: 1, right: 0, left: 0, bottom: 5 }}>
            <CartesianGrid opacity={0.2} vertical={false} />
            <XAxis dataKey="date" opacity={0.5} axisLine={false} tickLine={false} dy={10} fontSize={12} />
            <YAxis opacity={0.5} axisLine={false} tickLine={false} fontSize={12} />
            <Tooltip cursor={{ fill: "transparent" }} content={<CustomTooltip />} />
            <Legend verticalAlign="top" content={<CustomLegend services={services} />} />
            {services.map((service, index) => {
                const originalServiceName = Object.keys(nameMapping).find(key => nameMapping[key] === service);
                const colorService = serviceColorMap[originalServiceName!];
                return (
                    <Bar
                        key={index}
                        dataKey={service}
                        name={service}
                        fill={colorService}
                    />
                );
            })}
        </BarChart>
    </ResponsiveContainer>
);

export default BarChartComp;
