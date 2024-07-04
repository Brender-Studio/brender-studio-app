import HoverCardInfo from "@/components/custom/tooltip/HoverCardInfo"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RenderJobSelectProps {
    form: any
    fieldName: string
    label?: string
    options: {
        name: string
        value: string
    }[]
    defaultValue: any
}

const RenderJobSelect = ({ form, fieldName, label, options, defaultValue }: RenderJobSelectProps) => {

    const onValueChange = (value: string) => {
        form.setValue(fieldName, value)
    }

    const tooltips = [
        {
            fieldName: "job_settings.job_definition",
            title: "Blender Version - Job Definition",
            description: "The version of Blender that will be used to render the job.",
            node: <div>
                <p className="text-muted-foreground text-xs">
                    Job definitions are asociated with an ECR image that contains Blender and the required dependencies to render the job.
                </p>
                <br />
                <p className="text-muted-foreground text-xs">For example, if you select Blender 4.1.1, the job will be rendered using the Blender 4.1.1 job definition, which is associated with an ECR image that contains Blender 4.1.1 and the required dependencies.</p>

            </div>
        },
        {
            fieldName: "job_settings.job_queue",
            title: "Job Queue",
            description: "Choose Spot or On-Demand instances.",
            node: <div>
                <p className="text-muted-foreground text-xs">
                    Job queues determine the type of instances that will be used to process the job:
                    <br /><br />
                    <strong>Spot Instances:</strong> These are more economical as they take advantage of AWS's unused capacity, but they can be interrupted if AWS needs to reclaim that capacity. Ideal for flexible and interruption-tolerant jobs.
                    <br /><br />
                    <strong>On-Demand Instances:</strong> These provide guaranteed capacity without the risk of interruptions, although at a higher cost. They are suitable for critical jobs that cannot be interrupted.
                </p>
            </div>

        },
        {
            fieldName: "job_settings.job_attempts",
            title: "Job Attempts",
            description: "The number of times the job will be retried if it fails.",
            node: null
        },
        {
            fieldName: "job_settings.timeout",
            title: "Timeout",
            description: "Maximum time that the job will be allowed to run. If the job exceeds this time, it will be terminated.",
            node: null
        },
        {
            fieldName: "job_settings.array_size",
            title: "Array Size",
            description: "The number of array jobs that will be created. Each array job will process a range of frames.",
            node: <>
                <div>
                    <p className="text-muted-foreground text-xs">For example, if the array size is 10 and the total number of frames is 100, each array job will process 10 frames.
                        <br />
                        <br />
                        Autoscaling may start EC2 instances to process the array jobs in parallel, a smaller array size will require fewer instances.
                    </p>
                </div>
            </>

        }
    ]

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    {
                        label && (
                            <Label className="inline-flex gap-2">{label}
                                {
                                    tooltips.map((tooltip, index) => {
                                        if (tooltip.fieldName === fieldName) {
                                            return (
                                                <div key={index}>
                                                    <HoverCardInfo
                                                        title={tooltip.title}
                                                        content={tooltip.description}
                                                        children={tooltip.node}
                                                    />
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </Label>
                        )
                    }
                    <Select
                        onValueChange={onValueChange}
                        defaultValue={defaultValue}
                        value={field.value}
                    >
                        <FormControl>
                            <SelectTrigger className="text-xs">
                                <SelectValue placeholder={field.value} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option: { name: string, value: string }) => (
                                <SelectItem key={option.value} value={option.value} >
                                    {option.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default RenderJobSelect