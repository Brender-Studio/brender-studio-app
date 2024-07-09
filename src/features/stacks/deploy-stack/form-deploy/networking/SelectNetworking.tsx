import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { networkingOptions } from "./costData";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { z } from "zod";
import { deployStackSchema } from "@/schemas/deployStackSchema";
import { UseFormReturn } from "react-hook-form";

type FormDeploySchema = z.infer<typeof deployStackSchema>;

interface SelectNetworkingProps {
    form: UseFormReturn<FormDeploySchema>
}

const SelectNetworking = ({ form }: SelectNetworkingProps) => {
    const [selectedOption, setSelectedOption] = useState('public')

    return (
        <div>
            <Label>Networking</Label>
            <FormField
                control={form.control}
                name="isPrivate"
                render={({ field }) => (
                    <FormItem>
                        <FormDescription>
                            Networking in Brender Studio can be configured in two ways: Public Subnets or Private Subnets.
                            AWS Batch Intances (EC2) will be launched in the selected subnets and will have access to the selected networking configuration.
                        </FormDescription>
                        <FormControl>
                            <>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                                    {networkingOptions.map((option, index) => (
                                        <Card key={index} {...field}
                                            className={`cursor-pointer ${selectedOption === option.value ? 'border-[#F63652] border-2' : 'border'} hover:bg-accent`}
                                            onClick={() => {
                                                setSelectedOption(option.value);
                                                form.setValue('isPrivate', option.value === 'private');
                                            }}
                                        >
                                            <CardHeader>
                                                <CardTitle className="text-md">{option.type}</CardTitle>
                                                <CardDescription className="text-sm">{option.description}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="text-sm space-y-4">
                                                <div>
                                                    <span className="font-semibold">Pros:</span>
                                                    <ul className="list-inside list-disc">
                                                        {option.pros.map((pro, i) => (
                                                            <li key={i} className="mt-1 text-xs">
                                                                <span >{pro}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                <span className="font-semibold">Cons:</span>
                                                    <ul className="list-inside list-disc">
                                                        {option.cons.map((pro, i) => (
                                                            <li key={i} className="mt-1 text-xs">
                                                                <span >{pro}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </CardContent>
                                            <CardFooter>
                                                <div>
                                                    <div className="w-full">
                                                        {option.value && (
                                                            <div className="text-sm font-semibold">

                                                                <span className="font-normal text-muted-foreground">
                                                                    {option.cost}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </>
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

export default SelectNetworking