
export interface GroupsCostServices {
    Keys: string[];
    Metrics: {
        BlendedCost: {
            Amount: string;
        };
    };
}

export interface DataTableCostExplorerProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    isQueryLoading: boolean
}

export type ColumnsTableExplorerProps = {
    Service: any;
    Amount: any;
    deepLink: string;
    Monthly: string
};


export interface SelectDatePickerRangeProps {
    handleDateChange: (range: DateRange | undefined) => void;
    className?: string;
    isFetching: boolean;
}

export interface SelectChartProps {
    selectedTypeChart: string;
    handleChangeTypeChart: (typeChart: string) => void;
}


export interface SectionChartsProps {
    processedDataCharts: any;
    services: any;
    isLoading: boolean;
    areaChartData: any;
    barChartData: any;
}


export interface ProccesedDataChartProps {
    [date: string]: {
        service: string[];
        cost: number;
        color: string;
    }[];
}
