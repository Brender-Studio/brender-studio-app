import { Button } from '@/components/ui/button'
import { Eye, EyeIcon, EyeOff, UserPlus } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { cliProfileSchema } from '@/schemas/cliProfileSchema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useState } from 'react'
import { createProfile } from '@/cli-functions/user/createProfile'
import { useQueryClient } from '@tanstack/react-query'
import SpinnerButton from '@/components/custom/spinners/SpinnerButton'
import { useUserSessionStore } from '@/store/useSessionStore'

const AddProfileDialog = () => {
    const { getSessionData, setSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { isCliInstalled } = sessionData;

    const queryClient = useQueryClient()
    const [isLoading, setIsLoading] = useState(false)

    const [showPassword, setShowPassword] = useState({
        accessKey: false,
        secretKey: false,
    })

    const [openDialog, setOpenDialog] = useState(false)


    const form = useForm<z.infer<typeof cliProfileSchema>>({
        resolver: zodResolver(cliProfileSchema),
        defaultValues: {
            profileName: "",
            accessKey: "",
            secretKey: "",
        },
    })

    async function onSubmit(values: z.infer<typeof cliProfileSchema>) {
        console.log(values)
        try {
            setIsLoading(true)
            const res = await createProfile(values.profileName, values.accessKey, values.secretKey)
            console.log(res)
            if (res) {
                setSessionData({
                    ...sessionData,
                    currentProfile: values.profileName,
                    profiles: [...sessionData.profiles, values.profileName],
                    currentStack: null
                })

                queryClient.refetchQueries({
                    queryKey: ['profiles']
                })
            }
        } catch (error) {
            console.error(error)
            throw new Error(error as string)
        } finally {
            form.reset()
            setOpenDialog(false)
            setIsLoading(false)
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
                <Button size='sm' disabled={!isCliInstalled}>
                    <UserPlus size={16} className="mr-2" />
                    Add Profile
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Configure AWS CLI
                    </DialogTitle>
                    <DialogDescription>
                        Add a new AWS CLI profile. You must have created a user in AWS IAM and have access credentials.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="profileName"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>
                                        Profile Name
                                    </Label>
                                    <FormControl>
                                        <Input
                                            autoComplete='off'
                                            placeholder="Enter a profile name"
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="accessKey"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>
                                        Access Key
                                    </Label>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword.accessKey ? "text" : "password"}
                                                placeholder="Enter the access key"
                                                {...field}
                                                className="hide-password-toggle pr-12"
                                                value={field.value}
                                            />
                                            <Button
                                                variant="link"
                                                size='iconCard'
                                                type='button'
                                                className='rounded-full absolute right-2 top-1/2 transform -translate-y-1/2'
                                                onClick={() => setShowPassword((prev) => ({ ...prev, accessKey: !prev.accessKey }))}>
                                                {showPassword.accessKey ? <EyeOff size={16} /> : <EyeIcon size={16} />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="secretKey"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>
                                        Secret Key
                                    </Label>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword.secretKey ? "text" : "password"}
                                                placeholder="Enter the secret key"
                                                {...field}
                                                className="hide-password-toggle pr-12"
                                                value={field.value}
                                            />
                                            <Button
                                                variant="link"
                                                size='iconCard'
                                                type='button'
                                                className='rounded-full absolute right-2 top-1/2 transform -translate-y-1/2'
                                                onClick={() => setShowPassword((prev) => ({ ...prev, secretKey: !prev.secretKey }))}>
                                                {showPassword.secretKey ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className='pt-4'>
                            <Button
                                size='sm'
                                type="submit"
                                disabled={isLoading || !form.formState.isValid}
                                className={isLoading ? 'gap-2 flex' : ''}
                            >
                                {isLoading && <SpinnerButton />}
                                {isLoading ? "Creating Profile" : "Create Profile"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddProfileDialog