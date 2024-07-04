import SpinnerButton from "@/components/custom/spinners/SpinnerButton";
import { Separator } from "@/components/ui/separator";
import useGetJobArrayProperties from "@/react-query-utils/queries/job-batch-queries/useGetJobArrayProperties";


interface ArrayPropertiesProps {
    jobId: string
}

const ArrayProperties = ({ jobId }: ArrayPropertiesProps) => {

    const { data, isLoading } = useGetJobArrayProperties(jobId)


    return (
        <div>
            {
                isLoading ? (
                    <div >
                        <SpinnerButton />
                    </div>
                ) : (
                    <div className="min-w-40">
                        <div>{data[0]?.arrayProperties?.size ? 'Size: ' + data[0].arrayProperties.size : '-'}</div>
                        {data[0]?.arrayProperties?.size && <Separator className="my-2" />}
                        <div>
                            {
                                data[0]?.arrayProperties?.statusSummary && Object.keys(data[0].arrayProperties.statusSummary).map((key, index) => (
                                    <div key={index}>
                                        <div>{key}: {data[0].arrayProperties.statusSummary[key]}</div>
                                    </div>
                                ))
                            }
                        </div>


                    </div>
                )
            }
        </div>
    )
}

export default ArrayProperties