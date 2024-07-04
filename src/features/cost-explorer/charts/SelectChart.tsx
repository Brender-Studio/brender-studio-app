import { SelectChartProps } from '../costExplorerTypes';
import BarChartButton from '@/components/custom/buttons/BarChartButton';
import LineChartButton from '@/components/custom/buttons/LineChartButton';

const SelectChart = ({ selectedTypeChart, handleChangeTypeChart }: SelectChartProps) => {
    return (
        <div className="flex items-center gap-2">
            <BarChartButton
                isSelected={selectedTypeChart === 'bar'}
                onClick={() => handleChangeTypeChart('bar')}
            />
            <LineChartButton
                isSelected={selectedTypeChart === 'line'}
                onClick={() => handleChangeTypeChart('line')}
            />
        </div>
    );
};

export default SelectChart;
