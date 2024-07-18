import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { MailPlus } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SpinnerButton from "@/components/custom/spinners/SpinnerButton"
import { useUserSessionStore } from "@/store/useSessionStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { sesIdentitySchema } from "@/schemas/sesIdentitySchema"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { verifyEmail } from "@/cli-functions/ses-data/verifyEmail"
import { toast } from "@/components/ui/use-toast"
import { useQueryClient } from "@tanstack/react-query"
import { sesQueries } from "@/react-query-utils/query-key-store/queryKeyStore"


const AddIdentityDialog = () => {
    const { getSessionData } = useUserSessionStore();
    const { currentProfile, currentAwsRegion } = getSessionData();

    // console.log(currentProfile, currentAwsRegion)
    const [openDialog, setOpenDialog] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const queryClient = useQueryClient()

    const form = useForm<z.infer<typeof sesIdentitySchema>>({
        resolver: zodResolver(sesIdentitySchema),
        defaultValues: {
            identity: ""
        },
    })

    const onSubmit = async (data: z.infer<typeof sesIdentitySchema>) => {
        try {
            setIsLoading(true)
            await verifyEmail(data.identity, currentAwsRegion, currentProfile!)
            setIsLoading(false)
            setOpenDialog(false)
            toast({
                title: "Identity Created",
                description: `Identity with email ${data.identity} has been created successfully.`,
                variant: "success",
            })
            // Reset the form after successful submission
            form.reset()
        } catch (error) {
            setIsLoading(false)
            toast({
                title: "Error",
                description: "An error occurred while creating the identity. Please try again.",
                variant: "destructive",
            })
            throw error
        } finally {
            await queryClient.refetchQueries({
                queryKey: sesQueries.sesIdentitiesQueryKey(currentAwsRegion, currentProfile!),
            })
        }
    }

    return (
        <Dialog
            onOpenChange={
                (isOpen) => {
                    setOpenDialog(isOpen)
                    // Reset the form when the dialog is closed.
                    if (!isOpen) { form.reset() }
                }
            }
            open={openDialog}
        >
            <DialogTrigger asChild>
                <Button size='sm' disabled={!currentProfile || !currentAwsRegion}>
                    <MailPlus size={16} className="mr-2" />
                    Add Identity
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className='pb-4'>
                    <DialogTitle>
                        Add Identity
                    </DialogTitle>
                    <DialogDescription>
                        Add a new identity to send emails notifications when rendering is complete. You must verify the email address before using it.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="identity"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>
                                        Identity Email
                                    </Label>
                                    <FormControl>
                                        <Input
                                            autoComplete='off'
                                            placeholder="Enter email address"
                                            {...field} />
                                    </FormControl>
                                    <FormDescription className="text-xs">
                                        Enter the email address that you want to use as an identity.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button
                                size='sm'
                                type="submit"
                                disabled={isLoading || form.formState.isSubmitting || !form.formState.isValid}
                                className={isLoading ? 'gap-2 flex' : ''}
                            >
                                {isLoading && <SpinnerButton />}
                                {isLoading ? "Creating Identity" : "Create Identity"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddIdentityDialog