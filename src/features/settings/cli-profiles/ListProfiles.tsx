import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import AddProfileDialog from "./add-profile/AddProfileDialog"
import { useUserSessionStore } from "@/store/useSessionStore"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react"

const ListProfiles = () => {
    const { getSessionData, setSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentProfile, profiles } = sessionData;

    const onProfileChange = (profile: string) => {
        console.log(profile)
        setSessionData({
            ...sessionData,
            currentProfile: profile,
            currentStack: null
        })

        toast({
            title: `Profile set to ${profile}`,
            variant: "success",
            description: `Profile set to ${profile} successfully.`,
            duration: 2000,
        })
    }

    return (
        <div id="aws-profiles">
            <Card >
                <CardHeader>
                    <div className="flex items-center w-full justify-between">
                        <div>
                            <CardTitle className="text-md">AWS Profiles List</CardTitle>
                            <CardDescription className="text-xs">List of AWS CLI profiles that are currently available to use in the application for deploying stacks and managing resources.</CardDescription>
                        </div>
                        <AddProfileDialog />
                    </div>
                </CardHeader>
                <CardContent>
                    <RadioGroup defaultValue={currentProfile!} value={currentProfile!} onValueChange={onProfileChange}>
                        {profiles && profiles.length ? (
                            profiles.map((profile) => (
                                <React.Fragment key={profile}>
                                    <div className="flex items-center space-x-2 justify-between">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value={profile} id={profile} />
                                            <label htmlFor={profile} className="text-muted-foreground text-sm pr-2">{profile}</label>
                                        </div>
                                    </div>
                                    {/* <Separator /> */}
                                </React.Fragment>
                            ))
                        ) : (
                            <div className="text-center text-sm text-muted-foreground">
                                No profiles set yet.
                            </div>
                        )}
                    </RadioGroup>
                </CardContent>
            </Card>
        </div>
    )
}

export default ListProfiles