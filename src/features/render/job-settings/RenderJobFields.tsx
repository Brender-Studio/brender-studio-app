import RenderJobSelect from "./inputs/RenderJobSelect";
// import RenderJobInput from "./inputs/RenderJobInput";
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

interface RenderJobFieldsProps {
    form: any
    currentPathname: string
}

const RenderJobFields = ({ form, currentPathname }: RenderJobFieldsProps) => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion, currentProfile, currentStack } = getSessionData();
    const [gpuQuotas, setGpuQuotas] = useState({
        spot: null,
        onDemand: null
    })
    const [cpuQuotas, setCpuQuotas] = useState({
        spot: null,
        onDemand: null
    })

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

    const renderJobSelectField = (fieldName: string, label: string, options: any, defaultValue: any) => (
        <RenderJobSelect
            form={form}
            fieldName={fieldName}
            label={label}
            options={options}
            defaultValue={defaultValue}
        />
    );


    // const renderInputField = (fieldName: string, label: string, type: string, placeholder: string, defaultValue: string, minValue: number, maxValue?: number) => (
    //     <RenderJobInput
    //         form={form}
    //         fieldName={fieldName}
    //         label={label}
    //         type={type}
    //         placeholder={placeholder}
    //         defaultValue={defaultValue}
    //         minValue={minValue}
    //         maxValue={maxValue}
    //     />
    // );

    const filteredJobQueues = filterJobQueues(JobQueues, currentPathname);
    const filteredJobDefinitions = filterJobDefinitions(JobDefinitions);
    const jobDefinitionOptions = getJobDefinitionOptions(filteredJobDefinitions);
    const jobQueueOptions = getJobQueueOptions(filteredJobQueues);
    // const instanceTypeOptions = getInstanceTypeOptions(currentPathname);
    // console.log('JobDefinitions: ', JobDefinitions)

    /// remount component when stack changes
    useEffect(() => {
        console.log('Stack changed, remounting component')
    }, [currentStack, currentAwsRegion, currentProfile])

    const keyForRemount = currentStack || 'defaultKey';

    // set from values if job definitions and job queues data is available
    useEffect(() => {
        if (JobDefinitions && JobQueues) {
            form.setValue('job_settings.job_definition', filteredJobDefinitions?.[0]?.jobDefinitionName)
            form.setValue('job_settings.job_queue', filteredJobQueues?.[0]?.jobQueueName)
            form.setValue('job_settings.number_gpus', currentPathname === '/render-gpu' ? '1' : '0')
            form.setValue('job_settings.vcpus', currentPathname === '/render-gpu' ? '2' : '4')
            form.setValue('job_settings.memory', currentPathname === '/render-gpu' ? '12000' : '16000')
            form.setValue('job_settings.timeout', '3600')
            form.setValue('job_settings.job_attempts', '3')

            if (form.watch('type') === 'animation') {
                form.setValue('job_settings.array_size', currentPathname === '/render-gpu' ? '2' : '10')
            } else if (form.watch('type') === 'frame') {
                form.setValue('job_settings.array_size', '0')
            } else if (form.watch('type') === 'custom_render_python') {
                form.setValue('job_settings.array_size', '0')
            }
        }
    }, [JobDefinitions, JobQueues, form.watch('type')])

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
                                        {/*  timeout use select with predefined time in secons (show minutes realtion) */}
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
                                        {/* {renderInputField(`job_settings.timeout`,
                                            'Timeout (seconds)',
                                            'number',
                                            'Timeout',
                                            '900',
                                            0)
                                        } */}
                                        {/* job attempts is select with 5 */}
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
                                                    { name: '4', value: '4' },
                                                    { name: '8', value: '8' },
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