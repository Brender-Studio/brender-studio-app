import useGetEfsQuery from "@/react-query-utils/queries/efs-queries/useGetEfsQuery";
import { useUserSessionStore } from "@/store/useSessionStore";
import { DataTableEfs } from "./data-table-efs/DataTableEfs";
import { columns } from "./data-table-efs/colmuns";
import { columns as meteredCols } from "./data-table-metered-size/columns";
import EfsPieChart from "./efs-pie-chart/EfsPieChart";
import { DataTableMeteredSize } from "./data-table-metered-size/DataTableMeteredSize";
import NoStackSelected from "@/components/custom/no-data/NoStackSelected";
import { formatSize } from "@/lib/formatSize";

const EfsSection = () => {
    const { getSessionData } = useUserSessionStore();
    const { currentProfile, currentAwsRegion, currentStack } = getSessionData();

    const { data: efsData, isLoading } = useGetEfsQuery();

    const transformedData = efsData && efsData.map((item: { SizeInBytes: { ValueInIA: number; ValueInStandard: number; ValueInArchive: number; Value: number; }; }) => ({
        ValueInIA: item.SizeInBytes.ValueInIA,
        ValueInStandard: item.SizeInBytes.ValueInStandard,
        ValueInArchive: item.SizeInBytes.ValueInArchive,
        Value: item.SizeInBytes.Value,
    })) || [];


    const dataPie = transformedData && transformedData.length > 0 ? [
        {
            "name": "ValueInIA",
            "value": parseFloat(formatSize(transformedData[0].ValueInIA)) || 0
        },
        {
            "name": "ValueInStandard",
            "value": parseFloat(formatSize(transformedData[0].ValueInStandard)) || 0
        },
        {
            "name": "ValueInArchive",
            "value": parseFloat(formatSize(transformedData[0].ValueInArchive)) || 0
        },
    ] : [];


    return (
        <div className="py-6">
            {
                currentStack ? (
                    <>

                        <DataTableEfs
                            columns={columns}
                            data={efsData || []}
                            linkAwsConsole={`https://${currentAwsRegion}.console.aws.amazon.com/efs/home?region=${currentAwsRegion}#/file-systems`}
                            awsRegion={currentAwsRegion!}
                            awsProfile={currentProfile!}
                            currentStack={currentStack!}
                            isQueryLoading={isLoading}
                        />

                        <EfsPieChart
                            isQueryLoading={isLoading}
                            data={dataPie || []}
                            value={transformedData[0]?.Value || 0}
                        />

                        <DataTableMeteredSize
                            isQueryLoading={isLoading}
                            data={efsData || []}
                            columns={meteredCols}
                        />
                    </>
                ) : (
                    <NoStackSelected />
                )
            }
        </div>
    )
}

export default EfsSection