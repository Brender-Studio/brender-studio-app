import { useEffect } from 'react';
import { getAllAWSProfiles } from '@/cli-functions/user/getAllProfiles';
import { checkCliInstallation } from '@/cli-functions/user/checkCliInstallation';
import { useUserSessionStore } from '@/store/useSessionStore';
import { doesStackExist } from '@/cli-functions/stack-data/doesStackExist';

function useSession() {
    const { setSessionData, getSessionData } = useUserSessionStore();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { cliInstalled, cliVersion } = await checkCliInstallation();
                // console.log("CLI installed:", cliInstalled);
                // console.log("CLI version:", cliVersion);
                const fetchedProfiles = await getAllAWSProfiles();
                const profilesArray = Array.isArray(fetchedProfiles) ? fetchedProfiles : fetchedProfiles ? [fetchedProfiles] : [];

                const storedStack = getSessionData().currentStack;
                // console.log("Stored stack:", storedStack)

                let updatedStack = storedStack;
                if (storedStack && getSessionData().currentProfile !== null && getSessionData().currentAwsRegion) {
                    const stackExists = await doesStackExist(storedStack, getSessionData().currentAwsRegion, getSessionData().currentProfile!);
                    // console.log("Stack exists:", stackExists)
                    if (!stackExists) {
                        updatedStack = null;
                    }
                }

                // console.log("Updated stack:", updatedStack)

                const currentProfile = getSessionData().currentProfile;

                const sessionData = {
                    // currentProfile: getSessionData().currentProfile || profilesArray[0] || null,
                    currentProfile: currentProfile && profilesArray.includes(currentProfile) ? currentProfile : profilesArray[0] || null,
                    profiles: profilesArray,
                    currentAwsRegion: getSessionData().currentAwsRegion || "us-east-1",
                    currentStack: updatedStack,
                    isCliInstalled: cliInstalled,
                    cliVersion: cliVersion
                };

                setSessionData(sessionData);
            } catch (error) {
                console.error("Error fetching profiles:", error);
            }
        };

        fetchData();
    }, [setSessionData, getSessionData]);

    return getSessionData();
}

export default useSession;
