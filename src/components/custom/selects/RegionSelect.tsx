import { Select, SelectContent, SelectGroup, SelectItem, SelectTriggerFooter, SelectValueFooter } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { awsRegionsByContinent } from '@/lib/awsRegionsByContinent';
import { useUserSessionStore } from '@/store/useSessionStore';
import { Globe } from 'lucide-react';


const RegionSelect = () => {
  const { getSessionData, setSessionData } = useUserSessionStore();
  const sessionData = getSessionData();
  const { currentAwsRegion } = sessionData;

  const handleRegionChange = (value: string) => {
    const selectedRegion = value;

    setSessionData({
      ...sessionData,
      currentAwsRegion: selectedRegion, currentStack: null
    });

    toast({
      title: `Region set to ${selectedRegion}`,
      variant: "success",
      description: `Region set to ${selectedRegion} successfully.`,
      duration: 2000,
    });
  }

  return (
    <>
      <Select onValueChange={handleRegionChange} defaultValue={currentAwsRegion!} value={currentAwsRegion}>
        <SelectTriggerFooter className="flex items-center">
          <Globe className="w-4 h-4 mr-1" />
          <SelectValueFooter placeholder={currentAwsRegion} defaultValue={currentAwsRegion!} />
        </SelectTriggerFooter>
        <SelectContent className='w-48'>
          {Object.entries(awsRegionsByContinent).map(([continent, continentRegions]) => (
            <div key={continent}>
              <SelectGroup>
                {continent !== 'North America' && <Separator className="my-2" />}
                <h2 className="ml-2 text-sm font-semibold my-2">{continent}</h2>
                {continentRegions.map((region) => (
                  <SelectItem
                    key={region}
                    value={region || "unassigned"}
                    defaultValue={currentAwsRegion!}
                  >
                    {region}
                  </SelectItem>
                ))}
              </SelectGroup>
            </div>
          ))}
        </SelectContent>
      </Select>
    </>

  )
}

export default RegionSelect