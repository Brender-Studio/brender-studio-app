import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TooltipInfo from "@/components/custom/tooltip/TooltipInfo";
import { MaxvCpus } from "./MaxVcpus";
import { CustomSelectvCpus } from "./CustomSelectvCpus";
import { customVcpusOptions } from "./customVcpusOption";



interface ComputeOptionCardProps {
    option: any;
    selectedOption: string;
    form: any;
    onClickSetValues: any;
    setSelectedOption?: any;
}

export const ComputeOptionCard = ({ option, selectedOption, setSelectedOption, form, onClickSetValues }: ComputeOptionCardProps) => (
    <div>
        <Card
            className={`cursor-pointer h-full ${selectedOption === option.type ? 'border-brand border-2' : 'border'} hover:bg-accent`}
            onClick={() => {
                setSelectedOption(option.type)
                onClickSetValues(option)
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
                                options={Object.values(customVcpusOptions.onDemandCPUs).map((option: any) => option)}
                                label="OnDemandCPU"
                            />
                            <CustomSelectvCpus
                                disabled={selectedOption !== option.type}
                                form={form}
                                defaultValue={option.maxvCpus.spotCPU}
                                fieldName="maxvCpus.spotCPU"
                                onValueChange={form.setValue}
                                options={Object.values(customVcpusOptions.spotCPUs).map((option: any) => option)}
                                label="SpotCPU"
                            />
                            <CustomSelectvCpus
                                disabled={selectedOption !== option.type}
                                form={form}
                                defaultValue={option.maxvCpus.onDemandGPU}
                                fieldName="maxvCpus.onDemandGPU"
                                onValueChange={form.setValue}
                                options={Object.values(customVcpusOptions.onDemandGPUs).map((option: any) => option)}
                                label="OnDemandGPU"
                            />
                            <CustomSelectvCpus
                                disabled={selectedOption !== option.type}
                                form={form}
                                defaultValue={option.maxvCpus.spotGPU}
                                fieldName="maxvCpus.spotGPU"
                                onValueChange={form.setValue}
                                options={Object.values(customVcpusOptions.spotGPUs).map((option: any) => option)}
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
);