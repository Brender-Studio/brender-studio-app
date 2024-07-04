import { getAllAWSProfiles } from '@/cli-functions/user/getAllProfiles';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTriggerFooter, SelectValueFooter } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import SpinnerFooter from '../spinners/SpinnerFooter';
import { useUserSessionStore } from '@/store/useSessionStore';
import { toast } from '@/components/ui/use-toast';
import { User } from 'lucide-react';


const ProfileSelect = () => {
    const { getSessionData, setSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentProfile } = sessionData;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['profiles'],
        queryFn: () => getAllAWSProfiles(),
        enabled: currentProfile !== null,
    });

    const handleProfileChange = (value: string) => {
        // console.log('value', value)
        const selectedProfile = value;
        setSessionData({ ...sessionData, currentProfile: selectedProfile, currentStack: null });

        toast({
            title: `Profile set to ${selectedProfile}`,
            variant: "success",
            description: `Profile set to ${selectedProfile} successfully.`,
            duration: 2000,
        });
    };


    return (
        <>
            <Select
                defaultValue={currentProfile ? currentProfile : undefined}
                onValueChange={handleProfileChange}
                value={currentProfile ? currentProfile : undefined}
            >
                <SelectTriggerFooter className="flex items-center" disabled={isLoading || !currentProfile}>
                    <User className="w-4 h-4 mr-1" />
                    {isLoading ? <SpinnerFooter /> : <SelectValueFooter placeholder={currentProfile} defaultValue={currentProfile!} />}
                    {isError ? <p>Error loading profiles</p> : null}
                    {/* {data?.length === 0 ? <p>No profiles found</p> : null} */}
                    {!isLoading && !currentProfile && !isError && <p>Select a profile</p>}
                    {/* Check if data profiles exists in current profile, if not set the first item from data */}
                    {/* {data?.length !== 0 && !data?.includes(currentProfile!) && !isError && !isLoading && <p>Profile not found</p>} */}
                </SelectTriggerFooter>
                <SelectContent className="z-[120]">
                    {isError ? (
                        <SelectGroup>
                            <SelectItem className="text-start px-2" value="error" disabled>
                                Error loading profiles
                            </SelectItem>
                        </SelectGroup>
                    ) : data?.length === 0 ? (
                        <SelectGroup>
                            <p className="text-center text-xs text-muted-foreground">
                                No profiles found
                            </p>
                        </SelectGroup>
                    ) : (
                        <SelectGroup>
                            {Array.isArray(data) && data.map((profile, index) => (
                                <SelectItem
                                    key={index.toString()}
                                    value={profile.toLowerCase().toString() || "unassigned"}
                                    defaultValue={currentProfile || "unassigned"}
                                    defaultChecked={profile === currentProfile}
                                    onClick={() => handleProfileChange(profile)}
                                >
                                    {profile}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    )}
                </SelectContent>
            </Select>
        </>
    )
}

export default ProfileSelect