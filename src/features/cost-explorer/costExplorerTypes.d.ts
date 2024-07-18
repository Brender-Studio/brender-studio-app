
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
    Service: string;
    Amount: string;
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



// For CLI functions
export interface CostAndUsageResponse {
    ResultsByTime: ResultByTime[];
}

export interface ResultByTime {
    TimePeriod: {
        Start: string;
        End: string;
    };
    Groups: GroupsCostServices[];
}


export interface CostItem {
    Service: string;
    Monthly: string;
    TotalCost: string;
}

// For processed data
export interface ProcessedDataChartProps {
    [date: string]: ServiceCostData[];
}

export interface ServiceCostData {
    service: string;
    cost: number;
    color: string;
}

// For chart data
export interface BarChartData {
    name: string;
    [service: string]: number | string;
}

export interface AreaChartData {
    date: string;
    [service: string]: number | string;
}

export interface ProcessedDataChartProps {
    [date: string]: ServiceCostData[];
}

export interface ServiceCostData {
    service: string;
    cost: number;
    color: string;
}

export interface BarChartsSectionProps {
    barData: BarChartData[];
    services: string[];
}

export interface AreaChartsSectionProps {
    areaChartData: AreaChartData[];
    services: string[];
    processedData: ProcessedDataChartProps;
}

export interface AreaChartCompProps {
    averageData: AreaChartData[];
    services: string[];
    processedData: ProcessedDataChartProps;
}

// For component props
export interface SectionChartsProps {
    areaChartData: AreaChartData[] | undefined;
    barChartData: BarChartData[] | undefined;
    isLoading: boolean;
    services: string[] | undefined;
    processedDataCharts: ProcessedDataChartProps | null;
}

// For the hook
export interface UseDailyTotalCostResult {
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    isFetching: boolean;
    linkAWSDailyConsole: string;
    processedDataCharts: ProcessedDataChartProps | null;
    services: string[] | undefined;
    totalCost: number;
    barChartData: BarChartData[] | undefined;
    areaChartData: AreaChartData[] | undefined;
}