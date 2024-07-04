import GpuIcon from "@/components/custom/icons/GpuIcon"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTitle, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertTriangle, Cpu, MemoryStick } from "lucide-react"

interface CardOptionsProps {
    form: any
    name: string
    vcpus: string
    memory: string
    gpus?: string
    gpuQuotas?: any
    cpuQuotas?: any
}

const CardOptions = ({ form, name, vcpus, memory, gpus, gpuQuotas, cpuQuotas }: CardOptionsProps) => {

    const onSelect = (memory: string, vcpus: string, gpus: string) => {
        const jobQueue = form.watch('job_settings.job_queue');

        // Check if there is quota available for the selected instance type
        const hasQuota =
            (jobQueue.includes('Spot') && gpuQuotas?.spot >= 0 && gpuQuotas.spot >= parseInt(vcpus) + 2) ||
            (jobQueue.includes('OnDemand') && gpuQuotas?.onDemand >= 0 && gpuQuotas.onDemand >= parseInt(vcpus) + 2) ||
            (jobQueue.includes('Spot') && cpuQuotas?.spot >= 0 && cpuQuotas.spot >= parseInt(vcpus) + 2) ||
            (jobQueue.includes('OnDemand') && cpuQuotas?.onDemand >= 0 && cpuQuotas.onDemand >= parseInt(vcpus) + 2);

        // If there is quota available, set the values
        if (hasQuota) {
            form.setValue('job_settings.vcpus', vcpus)
            form.setValue('job_settings.memory', memory)
            form.setValue('job_settings.number_gpus', gpus || '0');
        } else {
            console.log('No quota available for this instance type.');
        }
    }


    return (
        <div className="relative">
            {/* Tooltip para Spot GPU */}
            {form.watch('job_settings.job_queue').includes('Spot') && gpuQuotas && gpuQuotas.spot >= 0 && gpuQuotas.spot < (parseInt(vcpus) + 2) && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <AlertTriangle size={16} className="text-yellow-700 absolute top-5 right-5 z-[1] cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent align="center" className="p-4 z-10">
                        <TooltipTitle className="font-semibold">
                            Quota Exceeded
                        </TooltipTitle>
                        <p className="text-muted-foreground text-xs max-w-80">
                            This EC2 instance type exceeds the quota limit for Spot instances. Your job may not run.
                        </p>
                    </TooltipContent>
                </Tooltip>
            )}

            {/* Tooltip para OnDemand GPU */}
            {form.watch('job_settings.job_queue').includes('OnDemand') && gpuQuotas && gpuQuotas.onDemand >= 0 && gpuQuotas.onDemand < (parseInt(vcpus) + 2) && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <AlertTriangle size={16} className="text-yellow-700  absolute top-5 right-5 z-[1] cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent align="center" className="p-4 z-10">
                        <TooltipTitle className="font-semibold">
                            Quota Exceeded
                        </TooltipTitle>
                        <p className="text-muted-foreground text-xs max-w-80">
                            This EC2 instance type exceeds the quota limit for On-Demand instances. Your job may not run.
                        </p>
                    </TooltipContent>
                </Tooltip>
            )}

            {/* Tooltip para Spot CPU */}
            {form.watch('job_settings.job_queue').includes('Spot') && cpuQuotas && cpuQuotas.spot >= 0 && cpuQuotas.spot < (parseInt(vcpus) + 2) && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <AlertTriangle size={16} className="text-yellow-700  absolute top-5 right-5 z-[1] cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent align="center" className="p-4 z-10">
                        <TooltipTitle className="font-semibold">
                            Quota Exceeded
                        </TooltipTitle>
                        <p className="text-muted-foreground text-xs max-w-80">
                            This EC2 instance type exceeds the quota limit for Spot instances. Your job may not run.
                        </p>
                    </TooltipContent>
                </Tooltip>
            )}

            {/* Tooltip para OnDemand CPU */}
            {form.watch('job_settings.job_queue').includes('OnDemand') && cpuQuotas && cpuQuotas.onDemand >= 0 && cpuQuotas.onDemand < (parseInt(vcpus) + 2) && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <AlertTriangle size={16} className="text-yellow-700 absolute top-5 right-5 z-[1] cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent align="center" className="p-4 z-[1] ">
                        <TooltipTitle className="font-semibold">
                            Quota Exceeded
                        </TooltipTitle>
                        <p className="text-muted-foreground text-xs max-w-80">
                            This EC2 instance type exceeds the quota limit for On-Demand instances. Your job may not run.
                        </p>
                    </TooltipContent>
                </Tooltip>
            )}
            <Card
                className={`w-full hover:bg-accent rounded-md cursor-pointer ${form.watch('job_settings.vcpus') === vcpus && form.watch('job_settings.memory') === memory ? 'border-2 border-[#F63652]' : ''}`}
                onClick={() => onSelect(memory, vcpus, gpus || '0')}
                disabled={
                    (form.watch('job_settings.job_queue').includes('Spot') && gpuQuotas && gpuQuotas.spot >= 0 && gpuQuotas.spot < (parseInt(vcpus) + 2)) ||
                    (form.watch('job_settings.job_queue').includes('OnDemand') && gpuQuotas && gpuQuotas.onDemand >= 0 && gpuQuotas.onDemand < (parseInt(vcpus) + 2)) ||
                    (form.watch('job_settings.job_queue').includes('Spot') && cpuQuotas && cpuQuotas.spot >= 0 && cpuQuotas.spot < (parseInt(vcpus) + 2)) ||
                    (form.watch('job_settings.job_queue').includes('OnDemand') && cpuQuotas && cpuQuotas.onDemand >= 0 && cpuQuotas.onDemand < (parseInt(vcpus) + 2))
                }
            >
                <CardHeader >
                    <CardTitle className="text-sm flex justify-between items-center">
                        {name.toLocaleUpperCase()}
                    </CardTitle>
                    <CardDescription className="flex gap-1 items-center">
                        <Cpu size={16} /> {vcpus} vCPUs
                    </CardDescription>
                    <CardDescription className="flex gap-1 items-center">
                        <MemoryStick size={16} /> {memory} MB
                    </CardDescription>
                    {gpus && (
                        <CardDescription className="flex gap-1 items-center">
                            <GpuIcon /> {gpus} GPUs
                        </CardDescription>
                    )}
                </CardHeader>
            </Card>
        </div>
    )
}

export default CardOptions