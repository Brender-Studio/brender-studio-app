import { Label } from '@/components/ui/label'
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import CustomSelectSpot from './CustomSelectSpot';
import { z } from 'zod';
import { deployStackSchema } from '@/schemas/deployStackSchema';
import { UseFormReturn } from 'react-hook-form';

type FormDeploySchema = z.infer<typeof deployStackSchema>;

interface SpotBidProps {
    form: UseFormReturn<FormDeploySchema>
}

const SpotBid = ({ form }: SpotBidProps) => {
    return (
        <div>
            <Label>
                Choose the Spot Bid Price Percentage
            </Label>
            <FormField
                control={form.control}
                name="spotBidPercentage"
                render={() => (
                    <FormItem>
                        <FormDescription>
                            The Spot Bid Price is the maximum amount you're willing to pay for a Spot Instance. This price is set as a percentage of the On-Demand price. The higher the percentage, the greater the chance your Spot Instance will be launched.
                            <br />
                            <br />
                            For example, if the On-Demand price for a CPU instance is $1.00 per hour and you set the Spot Bid Price to 80%, your Spot Instance will be launched if the Spot Price is less than $0.80 per hour.
                        </FormDescription>
                        <FormControl>
                            <div className='grid grid-cols-2 gap-4 pt-4'>
                                <div>
                                    <CustomSelectSpot
                                        form={form}
                                        fieldName="spotBidPercentage.spotCPU"
                                        label="CPU Spot Bid Price (%)"
                                        options={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                                        defaultValue={80}
                                    />
                                </div>
                                <div>
                                    <CustomSelectSpot
                                        form={form}
                                        fieldName="spotBidPercentage.spotGPU"
                                        label="GPU Spot Bid Price (%)"
                                        options={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                                        defaultValue={90}
                                    />
                                </div>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

export default SpotBid