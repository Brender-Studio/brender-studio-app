import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { awsRegionsByContinentGpu } from "@/lib/awsRegionsByContinent";
import { useUserSessionStore } from "@/store/useSessionStore";

const ListRegions = () => {
    const { getSessionData, setSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentAwsRegion } = sessionData;

    const onRegionChange = (region: string) => {
        setSessionData({
            ...sessionData,
            currentAwsRegion: region,
        });

        toast({
            title: `Region set to ${region}`,
            variant: "success",
            description: `Region set to ${region} successfully.`,
            duration: 2000,
        });
    };

    return (
        <div>
            <Card >
                <CardHeader >
                    <CardTitle className="text-md">AWS Regions List</CardTitle>
                    <CardDescription className="text-xs">
                        List of AWS regions with GPU support currently available to use in the application for deploying stacks and managing resources.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0 px-6">
                    <RadioGroup defaultValue={currentAwsRegion!} onValueChange={onRegionChange} value={currentAwsRegion}>
                        <div className="grid grid-cols-4">
                            {Object.entries(awsRegionsByContinentGpu).map(([continent, continentRegions]) => (
                                <div key={continent}>
                                    <h2 className="text-sm font-semibold mb-2">{continent}</h2>
                                    {continentRegions.map(({ region, g5, g6 }) => (
                                        <div key={region} className="flex items-center space-x-2">
                                            <RadioGroupItem value={region} id={region} />
                                            <label htmlFor={region} className="text-muted-foreground text-sm">
                                                {region}
                                            </label>
                                            <div className="flex space-x-1">
                                                {g5 && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                                                {g6 && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </RadioGroup>
                </CardContent>
                    <Separator className="mt-4" />
                    <div className="mt-4 px-6 pb-4">
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span className="text-xs">g5 (NVIDIA A10G)</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-xs">g6 (NVIDIA L4)</span>
                            </div>
                        </div>
                    </div>
            </Card>
        </div>
    );
}

export default ListRegions;
