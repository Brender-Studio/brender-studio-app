export interface QuotaData {
    QuotaCode: string;
    QuotaName: string;
    Value: number;
}

export interface Quota {
    spot: number;
    onDemand: number;
}
