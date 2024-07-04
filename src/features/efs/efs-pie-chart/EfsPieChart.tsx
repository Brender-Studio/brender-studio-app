import { Skeleton } from '@/components/ui/skeleton';
import { formatSize } from '@/lib/formatSize';
import { Pie, PieChart, Cell, Legend } from 'recharts';
import React, { useEffect, useState } from 'react';

interface EfsPieChartProps {
    data: { name: string, value: number }[];
    value: number;
    isQueryLoading: boolean;
}

const EfsPieChart: React.FC<EfsPieChartProps> = ({ data, value, isQueryLoading }) => {

    const COLORS = ['#82ca9d', '#8884d8', '#ffc658'];

    const transformedValue = formatSize(value);

    const fakeData = [
        { name: 'ValueInIA', value: 400 },
        { name: 'ValueInStandard', value: 300 },
        { name: 'ValueInArchive', value: 300 }
    ];

    const FAKE_COLORS = ['#3E3E3E', '#303030', '#1E1E1E'];

    const [displayData, setDisplayData] = useState(fakeData);

    useEffect(() => {
        if (!isQueryLoading) {
            const timeout = setTimeout(() => setDisplayData(data), 300);
            return () => clearTimeout(timeout);
        }
    }, [isQueryLoading]);

    return (
        <div className='relative flex justify-center w-full py-5'>
            <PieChart width={800} height={400}>
                <Pie
                    data={displayData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={100}
                    outerRadius={150}
                    label
                    stroke='none'
                    isAnimationActive={!isQueryLoading}
                >
                    {displayData.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={isQueryLoading ? FAKE_COLORS[index % FAKE_COLORS.length] : COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend
                    layout="horizontal"
                    align="center"
                    verticalAlign="bottom"
                    iconType="circle"
                    iconSize={10}
                />
            </PieChart>
            {isQueryLoading ? (
                <div className='space-y-2 absolute bottom-[47%] left-50% flex flex-col items-center justify-center z-50'>
                    <Skeleton className="w-20 h-8" />
                    <Skeleton className="w-20 h-4" />
                </div>
            ) : (
                <div className='absolute bottom-[47%] left-50% flex flex-col items-center justify-center z-50'>
                    <p className='text-2xl font-semibold'>{transformedValue}</p>
                    <p className='text-sm text-muted-foreground'>Total EFS Size</p>
                </div>
            )}
        </div>
    );
}

export default EfsPieChart;
