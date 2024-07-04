import { Label } from "@/components/ui/label";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { computeDataSection, computeOptions } from "./computeData";
import { ComputeOptionCard } from "./ComputeOptionCard";

interface SelectComputeResourcesProps {
  form: any;
}


const SelectComputeResources = ({ form }: SelectComputeResourcesProps) => {
  const [selectedOption, setSelectedOption] = useState(computeOptions[1].type);

  const onClickSetValues = (option: any) => {
    console.log("Setting values for option:", option.type);
    if (option.type !== 'custom') {
      form.setValue('maxvCpus', {
        onDemandCPU: option.maxvCpus.onDemandCPUs,
        spotCPU: option.maxvCpus.spotCPUs,
        onDemandGPU: option.maxvCpus.onDemandGPUs,
        spotGPU: option.maxvCpus.spotGPUs,
      });
    }
  }


  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label>{computeDataSection.title}</Label>
      </div>
      <FormField
        control={form.control}
        name="maxvCpus"
        render={() => (
          <FormItem>
            <FormDescription>
              The level of parallelism (i.e., how many tasks can run simultaneously) affects how AWS Batch will scale the number of instances (servers) needed to complete your rendering tasks.
            </FormDescription>
            <FormControl>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                {computeOptions.map((option) => (
                  <ComputeOptionCard
                    key={option.type}
                    form={form}
                    option={option}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    onClickSetValues={onClickSetValues}
                  />
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SelectComputeResources;