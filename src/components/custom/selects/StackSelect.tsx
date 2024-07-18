import { getStacksByRegion } from "@/cli-functions/stack-data/getStacksByRegion";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTriggerFooter, SelectValueFooter } from "@/components/ui/select"
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import SpinnerFooter from "../spinners/SpinnerFooter";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserSessionStore } from "@/store/useSessionStore";
import { stackQueries } from "@/react-query-utils/query-key-store/queryKeyStore";
import { Layers2 } from "lucide-react";

interface Item {
    StackName: string;
    StackStatus: string;
}

const StackSelect = () => {
    const { getSessionData, setSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentProfile, currentAwsRegion, currentStack } = sessionData;

    const navigate = useNavigate()
    const currentPathname = useLocation().pathname

    const { data, isLoading, isError, error } = useQuery({
        queryKey: stackQueries.stacksQueryKey(currentAwsRegion, currentProfile!),
        queryFn: () => {
            if (currentAwsRegion && currentProfile) {
                return getStacksByRegion(currentAwsRegion, currentProfile);
            }
        },
        retry: 1,
        enabled: currentAwsRegion !== null && currentProfile !== null,
    });


    const handleStackChange = (value: string) => {
        const selectedStack = value;
        setSessionData({ ...sessionData, currentStack: selectedStack });

        if (currentPathname.split('/')[1] === 'renders') {
            navigate(`/renders`)
        }

        toast({
            title: 'Stack Changed',
            description: `Current stack is now set to ${selectedStack}`,
            variant: 'success',
            duration: 2000,
        })
    }


    if (isError) {
        toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
        })
    }


    return (
        <>
            <Select defaultValue={currentStack || undefined} onValueChange={handleStackChange} value={currentStack!}>
                <SelectTriggerFooter className="flex items-center" disabled={isLoading || data?.length === 0 || !data || isError }>
                    <Layers2 className="w-4 h-4 mr-1" />
                    {isLoading ? <SpinnerFooter /> : <SelectValueFooter placeholder={currentStack} defaultValue={currentStack!} />}
                    {isError ? <p>Error loading stacks</p> : null}
                    {data?.length === 0 ? <p>No stacks found</p> : null}
                    {!isLoading && !currentStack && !isError && data?.length !== 0 && <p>Select a stack</p>}
                </SelectTriggerFooter>
                <SelectContent className="z-[120]">
                    {isError ? (
                        <SelectGroup>
                            <SelectItem className="text-start px-2" value="error" disabled>
                                Error loading stacks
                            </SelectItem>
                        </SelectGroup>
                    ) : data?.length === 0 ? (
                        <SelectGroup>
                            <p className="text-center text-xs text-muted-foreground">
                                No stacks found
                            </p>
                        </SelectGroup>
                    ) : (
                        <SelectGroup>
                            {data?.map((item: Item, index: number) => (
                                <SelectItem
                                    defaultChecked={item.StackName === currentStack}
                                    key={index}
                                    disabled={item.StackStatus !== 'CREATE_COMPLETE'}
                                    value={item.StackName.toString() || "unassigned"}
                                    onClick={() => handleStackChange(item.StackName)}
                                    className={currentStack === item.StackName ? 'bg-accent' : ''}
                                >
                                    {item.StackName.toLocaleUpperCase()}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    )}
                </SelectContent>
            </Select>
        </>
    )
}

export default StackSelect