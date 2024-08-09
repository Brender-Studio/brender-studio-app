import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import SelectNetworking from "./networking/SelectNetworking"
import SelectBlenderImages from "./blender-images/SelectBlenderImages"
import TermsCheckbox from "./terms-checkbox/TermsCheckbox"
import { Label } from "@/components/ui/label"
import CostInfo from "../cost-info/CostInfo"
import { doesStackExist } from "@/cli-functions/stack-data/doesStackExist"
import NoProfile from "@/components/custom/alerts/NoProfile"
import { deployStackSchema } from "@/schemas/deployStackSchema"
import { useUserSessionStore } from "@/store/useSessionStore"
import ConfirmDeployDialog from "./confirm-deploy-dialog/ConfirmDeployDialog"
// import SelectComputeResources from "./compute-resources/SelectComputeResources"
import { computeOptions } from "./compute-resources/computeData"
import SpotBid from "./spot-bid/SpotBid"

const FormDeployStack = () => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion, currentProfile } = getSessionData();
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // const middleCompute = computeOptions.find(option => option.value === 'middle');
    const highCompute = computeOptions.find(option => option.value === 'high');


    const initialData = {
        stackName: "",
        isPrivate: false,
        blenderVersions: [],
        region: currentAwsRegion,
        profile: currentProfile!,
        terms: false,
        maxvCpus: {
            onDemandGPU: highCompute?.maxvCpus.onDemandGPUs,
            onDemandCPU: highCompute?.maxvCpus.onDemandCPUs,
            spotCPU: highCompute?.maxvCpus.spotCPUs,
            spotGPU: highCompute?.maxvCpus.spotGPUs,
        },
        spotBidPercentage: {
            spotCPU: 80,
            spotGPU: 90
        }
    }


    const form = useForm<z.infer<typeof deployStackSchema>>({
        mode: 'onChange',
        resolver: zodResolver(deployStackSchema),
        defaultValues: initialData
    });

    async function checkStackName(stackName: string) {
        try {
            const res = await doesStackExist('BRENDER-STACK-' + stackName, currentAwsRegion, currentProfile!);
            if (res) {
                form.setError('stackName', {
                    type: 'manual',
                    message: 'Stack name already exists.'
                });
                document.getElementById('stackName')?.focus();

            } else {
                form.clearErrors('stackName');
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        form.setValue('profile', currentProfile!);
        form.setValue('region', currentAwsRegion);
    }, [currentProfile, currentAwsRegion]);

    const handleStackNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        form.setValue('stackName', e.target.value.toUpperCase(), { shouldValidate: true, })
    }

    return (
        <>
            {
                currentProfile ? (

                    <Form {...form}>
                        <form
                            className="space-y-8 py-6">
                            <div className="grid grid-cols-4 gap-4">
                                <FormField
                                    control={form.control}
                                    name="stackName"
                                    render={() => (
                                        <FormItem className="col-span-2">
                                            <Label>Farm Stack Name</Label>
                                            <FormControl>
                                                <div className="flex relative items-center">
                                                    <Button type="button" variant="secondary" className="z-20 pl-3 text-muted-foreground text-sm rounded-r-none cursor-default">BRENDER-STACK-</Button>
                                                    <Input
                                                        autoComplete="off"
                                                        id="stackName"
                                                        onChange={handleStackNameChange}
                                                        onBlurCapture={(e) => checkStackName(e.target.value)}
                                                        className="absolute pl-40" placeholder="YOUR-FARM-NAME" />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="region"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Region</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled value={currentAwsRegion} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="profile"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Profile</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled value={currentProfile || ''} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <SelectNetworking form={form} />

                            {/* <SelectComputeResources form={form} /> */}

                            <SpotBid form={form} />

                            <SelectBlenderImages form={form} />

                            <CostInfo />

                            <TermsCheckbox form={form} />

                            <div className="w-full flex justify-end">
                                <ConfirmDeployDialog
                                    form={form}
                                    openDialog={isDialogOpen}
                                    setOpenDialog={setIsDialogOpen}
                                    title="Review & Deploy"
                                    description="Please review the information before deploying the stack."
                                />
                            </div>
                        </form>
                    </Form>

                ) : (<NoProfile />)
            }

        </>
    )
}

export default FormDeployStack