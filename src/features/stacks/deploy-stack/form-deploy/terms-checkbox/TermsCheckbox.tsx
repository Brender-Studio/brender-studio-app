import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { deployStackSchema } from "@/schemas/deployStackSchema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

type FormDeploySchema = z.infer<typeof deployStackSchema>;

interface TermsCheckboxProps {
    form: UseFormReturn<FormDeploySchema>
}

const TermsCheckbox = ({ form }: TermsCheckboxProps) => {
    return (
        <>
            <FormField
                control={form.control}
                name="terms"
                render={({ field: { onChange, value } }) => (
                    <FormItem>
                        <FormControl>
                            <div className="items-top flex space-x-2">
                                <Checkbox
                                    id="terms1"
                                    // {...field}
                                    checked={value}
                                    onCheckedChange={onChange}
                                />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor="terms1"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Accept terms and conditions
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                        By checking this box,
                                        I acknowledge that the deployment of resources on AWS may incur associated costs,
                                        and I take responsibility for managing these expenses and resources appropriately.
                                    </p>
                                </div>
                            </div>
                        </FormControl>
                        <FormMessage />

                    </FormItem>
                )}
            />
        </>
    )
}

export default TermsCheckbox