import SpinnerButton from "@/components/custom/spinners/SpinnerButton";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserSessionStore } from "@/store/useSessionStore";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ClearLocalStorage = () => {
    const { getSessionData, setSessionData } = useUserSessionStore();
    const sessionData = getSessionData();


    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    const handleCleanUp = () => {
        setIsLoading(true);

        setTimeout(() => {
            setSessionData({
                ...sessionData,
                currentProfile: null,
                profiles: [],
                currentAwsRegion: 'us-east-1',
                currentStack: null,
                isCliInstalled: false,
            });

            localStorage.clear();

            queryClient.clear();
            navigate('/');
            window.location.reload();
        }, 1000);
    };

    return (
        <div>
            <Card>
                <CardHeader>
                    <div className="flex items-center w-full justify-between">
                        <div>
                            <CardTitle className="text-md">Clear Local Storage</CardTitle>
                            <CardDescription className="text-xs">
                                Clear all local storage data from the application. This will remove all
                                the profiles, regions, and other settings from the application.
                            </CardDescription>
                        </div>
                        <Button
                            size="sm"
                            className={isLoading ? 'gap-2 flex' : ''}
                            disabled={isLoading}
                            onClick={handleCleanUp} variant="destructive">
                            {isLoading && <SpinnerButton />}
                            {isLoading ? 'Clearing' : 'Clear Local Storage'}
                        </Button>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
};

export default ClearLocalStorage;
