import RenderJobSelect from "./inputs/RenderJobSelect";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { filterJobDefinitions, filterJobQueues } from "./helpers/jobFilterUtils";
import { getJobDefinitionOptions, getJobQueueOptions } from "./helpers/optionsUtils";
import { useUserSessionStore } from "@/store/useSessionStore";
import { cpuContainerOptions, gpuContainerOptions } from "./data/containerOptions";
import CardOptions from "./inputs/CardOptions";
import useGetJobDefinitionsQuery from "@/react-query-utils/queries/job-batch-queries/useGetJobDefinitionsQuery";
import useGetJobQueuesQuery from "@/react-query-utils/queries/job-batch-queries/useGetJobQueuesQuery";
import LabelSeparator from "@/components/custom/structure/LabelSeparator";
import FormFieldSkeleton from "@/components/custom/skeletons/FormFieldSkeleton";
import GpuQuota from "./components/GpuQuota";
import EnvironmentVars from "./components/environment-vars/EnvironmentVars";
import CpuQuota from "./components/CpuQuota";
import DataTableHeader from "@/components/custom/structure/DataTableHeader";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formRenderSchema } from "@/schemas/formRenderSchema";
import { Quota } from "./components/quota-types";
import { DEFAULT_JOB_SETTINGS, JOB_TYPES } from "./data/defaultJobSettings";

interface RenderJobFieldsProps {
    form: UseFormReturn<z.infer<typeof formRenderSchema >>;
    currentPathname: string
}

interface OptionsVars {
    name: string;
    value: string;
}[]

const RenderJobFields = ({ form, currentPathname }: RenderJobFieldsProps) => {
    const [gpuQuotas, setGpuQuotas] = useState<Quota>();
    const [cpuQuotas, setCpuQuotas] = useState<Quota>();

    const { currentAwsRegion, currentProfile, currentStack } = useUserSessionStore().getSessionData();

    const { data: JobDefinitions, error, isLoading, isError } = useGetJobDefinitionsQuery({ enabled: true });
    const { data: JobQueues } = useGetJobQueuesQuery({ enabled: true });


    if (isError) {
        console.log('JobDefinitions error: ', error)
        toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
        })
    }

    const renderJobSelectField = (fieldName: string, label: string, options: OptionsVars[], defaultValue: string) => (
        <RenderJobSelect
            form={form}
            fieldName={fieldName as any} 
            label={label}
            options={options}
            defaultValue={defaultValue}
        />
    );

    const filteredJobQueues = filterJobQueues(JobQueues, currentPathname);
    const filteredJobDefinitions = filterJobDefinitions(JobDefinitions);
    const jobDefinitionOptions = getJobDefinitionOptions(filteredJobDefinitions);
    const jobQueueOptions = getJobQueueOptions(filteredJobQueues);

    /// remount component when stack changes
    useEffect(() => {
        // console.log('Stack changed, remounting component')
    }, [currentStack, currentAwsRegion, currentProfile])

    const keyForRemount = currentStack || 'defaultKey';

    // set from values if job definitions and job queues data is available
    useEffect(() => {
        if (JobDefinitions && JobQueues) {
            const isGPU = currentPathname === '/render-gpu'
            const jobSettings = isGPU ? DEFAULT_JOB_SETTINGS.GPU : DEFAULT_JOB_SETTINGS.CPU
    
            form.setValue('job_settings.job_definition', filteredJobDefinitions?.[0]?.jobDefinitionName)
            form.setValue('job_settings.job_queue', filteredJobQueues?.[0]?.jobQueueName)
            form.setValue('job_settings.number_gpus', jobSettings.number_gpus)
            form.setValue('job_settings.vcpus', jobSettings.vcpus)
            form.setValue('job_settings.memory', jobSettings.memory)
            form.setValue('job_settings.timeout', DEFAULT_JOB_SETTINGS.COMMON.timeout)
            form.setValue('job_settings.job_attempts', DEFAULT_JOB_SETTINGS.COMMON.job_attempts)
    
            const jobType = form.watch('type')
            if (jobType === JOB_TYPES.ANIMATION) {
                form.setValue('job_settings.array_size', jobSettings.array_size)
            } else if (jobType === JOB_TYPES.FRAME || jobType === JOB_TYPES.CUSTOM_RENDER_PYTHON) {
                form.setValue('job_settings.array_size', '0')
            }
        }
    }, [JobDefinitions, JobQueues, form.watch('type'), currentPathname])

    // console.log('Gpu Quotas: ', gpuQuotas)

    return (
        <div key={keyForRemount}>
            {
                isLoading ? (
                    <div className="w-full flex justify-center py-4">
                        <FormFieldSkeleton />
                    </div>
                )
                    : (
                        <>
                            {
                                JobDefinitions && JobQueues && JobDefinitions.length > 0 && JobQueues.length > 0 &&
                                (
                                    <div className="grid grid-cols-4 gap-2">
                                        {renderJobSelectField(`job_settings.job_definition`,
                                            'Blender version',
                                            jobDefinitionOptions,
                                            filteredJobDefinitions?.[0]?.jobDefinitionName || ''
                                        )
                                        }

                                        {renderJobSelectField(`job_settings.job_queue`,
                                            'Job Queue',
                                            jobQueueOptions,
                                            filteredJobQueues?.[0]?.jobQueueName || '')
                                        }
                                    
                                        {
                                            renderJobSelectField(`job_settings.timeout`,
                                                'Timeout',
                                                [
                                                    { name: '15 minutes', value: '900' },
                                                    { name: '30 minutes', value: '1800' },
                                                    { name: '45 minutes', value: '2700' },
                                                    { name: '1 hour', value: '3600' },
                                                    { name: '2 hour', value: '7200' },
                                                    { name: '3 hour', value: '10800' },
                                                    { name: '12 hour', value: '43200' },
                                                    { name: '24 hour', value: '86400' },
                                                    { name: '48 hour', value: '172800' },
                                                    { name: '72 hour', value: '259200' }
                                                ]
                                                , '3600')
                                        }
                                        
                                        {renderJobSelectField(`job_settings.job_attempts`,
                                            'Job Attempts',
                                            [
                                                { name: '1', value: '1' },
                                                { name: '2', value: '2' },
                                                { name: '3', value: '3' },
                                                { name: '4', value: '4' },
                                                { name: '5', value: '5' }
                                            ]
                                            , '3')
                                        }
                                        {form.watch('type') === 'animation' && (
                                            renderJobSelectField(`job_settings.array_size`,
                                                'Array Size',
                                                [
                                                    { name: '2', value: '2' },
                                                    { name: '4', value: '4' },
                                                    { name: '8', value: '8' },
                                                    { name: '10', value: '10' },
                                                    { name: '12', value: '12' },
                                                    { name: '16', value: '16' },
                                                    { name: '20', value: '20' }
                                                ]
                                                , '2')
                                        )}
                                        {form.watch('type') === 'custom_render_python' && (
                                            renderJobSelectField(`job_settings.array_size`,
                                                'Array Size',
                                                [
                                                    { name: '0', value: '0' },
                                                    { name: '2', value: '2' },
                                                    { name: '3', value: '3' },
                                                    { name: '4', value: '4' },
                                                    { name: '5', value: '5' },
                                                    { name: '6', value: '6' },
                                                    { name: '7', value: '7' },
                                                    { name: '8', value: '8' },
                                                    { name: '9', value: '9' },
                                                    { name: '10', value: '10' },
                                                    { name: '12', value: '12' },
                                                    { name: '16', value: '16' },
                                                    { name: '20', value: '20' }
                                                ]
                                                , '0')
                                        )}
                                        {form.watch('type') === 'custom_render_python' && (
                                            <div className="col-span-6">
                                                <LabelSeparator label="Container Environment Variables" colSpan={5} py={8} />
                                                <EnvironmentVars form={form} />
                                            </div>
                                        )}

                                        {
                                            currentPathname === '/render-gpu' && (
                                                <GpuQuota
                                                    setGpuQuotas={setGpuQuotas}
                                                />
                                            )
                                        }
                                        {
                                            currentPathname === '/render-cpu' && (
                                                <CpuQuota
                                                    setCpuQuotas={setCpuQuotas}
                                                />
                                            )
                                        }
                                        <LabelSeparator label="Container EC2 configuration" colSpan={5} py={8} />
                                        <div className="col-span-6 pb-4">
                                            <DataTableHeader
                                                title="Server Configuration"
                                                description={currentPathname === '/render-cpu' ? 'Customize the configuration by specifying the number of vCPUs and memory capacity. Please note that 2 vCPUs are allocated for auxiliary job tasks.' : 'Customize the configuration by specifying the number of vCPUs, memory capacity, and GPU units. Please note that 2 vCPUs are allocated for auxiliary job tasks.'}
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 w-full col-span-6 gap-2">
                                            {
                                                currentPathname === '/render-cpu' ? (
                                                    cpuContainerOptions.map((option, index) => (
                                                        <CardOptions
                                                            key={index}
                                                            form={form}
                                                            name={option.name}
                                                            vcpus={option.vcpus}
                                                            memory={option.memory}
                                                            cpuQuotas={cpuQuotas}
                                                        />
                                                    ))
                                                ) : (
                                                    gpuContainerOptions.map((option, index) => (
                                                        <CardOptions
                                                            key={index}
                                                            form={form}
                                                            name={option.name}
                                                            vcpus={option.vcpus}
                                                            memory={option.memory}
                                                            gpus={option.gpus}
                                                            gpuQuotas={gpuQuotas}
                                                        />
                                                    ))
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </>
                    )
            }
        </div>
    )
}

export default RenderJobFields