import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TooltipInfo from "@/components/custom/tooltip/TooltipInfo";
import { MaxvCpus } from "./MaxVcpus";
import { CustomSelectvCpus } from "./CustomSelectvCpus";
import { customVcpusOptions } from "./customVcpusOption";
import { deployStackSchema } from "@/schemas/deployStackSchema";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

type FormDeploySchema = z.infer<typeof deployStackSchema>;

interface MaxvCpus {
    onDemandCPUs: number;
    onDemandGPUs: number;
    spotCPUs: number;
    spotGPUs: number;
}

export interface Option {
    description?: string;
    maxvCpus: MaxvCpus;
    onDemandCPUs?: number;
    onDemandGPUs?: number;
    spotCPUs?: number;
    spotGPUs?: number;
    type: string;
    value: string;
    tooltipInfo?: string;
}

interface ComputeOptionCardProps {
    option: Option;
    selectedOption: string;
    form: UseFormReturn<FormDeploySchema>;
    onClickSetValues: (option: Option) => void;
    setSelectedOption?: (optionType: string) => void;
}


export const ComputeOptionCard = ({ option, selectedOption, setSelectedOption, form, onClickSetValues }: ComputeOptionCardProps) => {

    return (
        <div>
            <Card
                className={`cursor-pointer h-full ${selectedOption === option.type ? 'border-brand border-2' : 'border'} hover:bg-accent`}
                onClick={() => {
                    if (setSelectedOption) {
                        setSelectedOption(option.type);
                    }
                    onClickSetValues(option);
                }}
            >
                <CardHeader className="w-full">
                    <div className="flex items-center gap-2">
                        <CardTitle className="text-md">{option.type}</CardTitle>
                        {option.tooltipInfo && <TooltipInfo description={option.tooltipInfo} />}
                    </div>
                    {option.description && <CardDescription className="text-sm">{option.description}</CardDescription>}
                </CardHeader>
                <CardContent>
                    <div className="min-h-36">
                        {option.value === 'custom' ? (
                            <div className="grid grid-cols-2 gap-2">
                                <CustomSelectvCpus
                                    disabled={selectedOption !== option.type}
                                    form={form}
                                    defaultValue={customVcpusOptions.onDemandCPUs[0]}
                                    fieldName="maxvCpus.onDemandCPU"
                                    onValueChange={form.setValue}
                                    options={customVcpusOptions.onDemandCPUs}
                                    label="OnDemandCPU"
                                />
                                <CustomSelectvCpus
                                    disabled={selectedOption !== option.type}
                                    form={form}
                                    defaultValue={option.maxvCpus.spotCPUs}
                                    fieldName="maxvCpus.spotCPU"
                                    onValueChange={form.setValue}
                                    // options={Object.values(customVcpusOptions.spotCPUs).map((option: any) => option)}
                                    options={customVcpusOptions.spotCPUs}
                                    label="SpotCPU"
                                />
                                <CustomSelectvCpus
                                    disabled={selectedOption !== option.type}
                                    form={form}
                                    defaultValue={option.maxvCpus.onDemandGPUs}
                                    fieldName="maxvCpus.onDemandGPU"
                                    onValueChange={form.setValue}
                                    // options={Object.values(customVcpusOptions.onDemandGPUs).map((option: any) => option)}
                                    options={customVcpusOptions.onDemandGPUs}
                                    label="OnDemandGPU"
                                />
                                <CustomSelectvCpus
                                    disabled={selectedOption !== option.type}
                                    form={form}
                                    defaultValue={option.maxvCpus.spotGPUs}
                                    fieldName="maxvCpus.spotGPU"
                                    onValueChange={form.setValue}
                                    // options={Object.values(customVcpusOptions.spotGPUs).map((option: any) => option)}
                                    options={customVcpusOptions.spotGPUs}
                                    label="SpotGPU"
                                />
                            </div>
                        ) : (
                            <MaxvCpus maxvCpus={option.maxvCpus} />
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}