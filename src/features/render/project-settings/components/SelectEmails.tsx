import TooltipInfo from "@/components/custom/tooltip/TooltipInfo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import useGetSesIdentitiesQuery from "@/react-query-utils/queries/ses-queries/useGetSesIdentitiesQuery";
import { MailPlus } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface SelectEmailsProps {
    form: any
}

const SelectEmails = ({ form }: SelectEmailsProps) => {
    const navigate = useNavigate()

    const { data, isLoading } = useGetSesIdentitiesQuery()

    // console.log('data', data)
    const options = data
        ? data.map((item: any) => ({
            name: item.identity,
            value: item.identity,
            status: item.attributes[item.identity].VerificationStatus // Acceder dinámicamente a VerificationStatus
        }))
        : [];

    const defaultValue = form.getValues('ses.ses_email')

    const onValueChange = (value: string) => {
        form.setValue('ses.ses_email', value)
    }


    useEffect(() => {
        if (data) {
            const validIdentity = data.find((item: any) => item.attributes[item.identity].VerificationStatus === 'Success');
            if (validIdentity) {
                form.setValue('ses.ses_email', validIdentity.identity);
                form.setValue('ses.enable_notifications', true);
            } else {
                form.setValue('ses.ses_email', '');
                form.setValue('ses.enable_notifications', false);
            }
        }
    }, [data]);


    return (
        <>
            {
                isLoading ? (
                    <div className="flex flex-col gap-2">
                        <Skeleton className="w-40 h-4 " />
                        <Skeleton className="w-full h-10" />
                    </div>
                ) : (
                    <div className="relative w-full">
                        {/* sHOW BUTTON SET IDENTITY IF NO VALID EMAILS O DATA.LENGHT IS 0 */}
                        {options.every((item: any) => item.status !== 'Success') ? (
                            <div className="mt-2 w-full">
                                <FormLabel className="inline-flex gap-2">Email Notification
                                    <TooltipInfo
                                        title="Email Notification"
                                        description="Email address to receive notifications when the render job is complete or fails."
                                    />
                                </FormLabel>
                                <Button
                                    onClick={() => {
                                        navigate('/email-notifications')
                                    }}
                                    className="text-xs text-primary-foreground w-full mt-2"
                                >
                                    <MailPlus size={16} className="mr-2" />
                                    Set Identity
                                </Button>
                            </div>
                        ) : (
                            <>
                                <FormField
                                    control={form.control}
                                    name="ses.ses_email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="inline-flex gap-2">Email Notification
                                                <TooltipInfo
                                                    title="Email Notification"
                                                    description="Email address to receive notifications when the render job is complete or fails."
                                                />
                                            </FormLabel>
                                            <Select

                                                onValueChange={onValueChange}
                                                defaultValue={defaultValue}
                                                value={field.value}
                                                disabled={options.length === 0 || options.every((item: any) => item.status !== 'Success') || !form.getValues('ses.enable_notifications')}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="text-xs w-full">
                                                        <SelectValue placeholder={field.value || 'Select Email'} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="w-full">
                                                    {options?.map((option: { name: string, value: string, status: string }) => (
                                                        <SelectItem key={option.value} value={option.value}
                                                            disabled={option.status !== 'Success'}
                                                        >
                                                            {option.name}
                                                            <Badge
                                                                className="ml-2"
                                                                variant={option.status === 'Success' ? 'success' : 'secondary'}
                                                            >
                                                                {option.status === 'Success' ? 'Verified' : 'Unverified'}
                                                            </Badge>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="ses.enable_notifications"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="absolute right-0 top-0 flex justify-between items-center">
                                                    <FormLabel className="text-xs font-normal text-muted-foreground mr-2">Notifications</FormLabel>
                                                    <Switch
                                                        disabled={options.length === 0 || options.every((item: any) => item.status !== 'Success')}
                                                        {...field}
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            (checked: boolean) => {
                                                                field.onChange(checked)
                                                                if (!checked) {
                                                                    form.setValue('ses.ses_email', '')
                                                                } else {
                                                                    const validIdentity = data?.find((item: any) => item.attributes[item.identity].VerificationStatus === 'Success');
                                                                    if (validIdentity) {
                                                                        form.setValue('ses.ses_email', validIdentity.identity);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    />
                                                </div>
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )
                        }

                        {/* Create select formfield for choosing the email address */}

                        {/* Create checkbox formfield for enabling or disabling notifications */}



                    </div>
                )
            }
        </>
    )
}

export default SelectEmails