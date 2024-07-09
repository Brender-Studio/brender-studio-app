
interface MaxvCpusProps {
  maxvCpus: {
    onDemandCPUs: number;
    onDemandGPUs: number;
    spotCPUs: number;
    spotGPUs: number;
  }
}

export const MaxvCpus = ({ maxvCpus }: MaxvCpusProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-sm font-semibold col-span-2">
        Maximum vCPUs per Compute Environment
      </h2>
      <ul className="list-inside list-disc text-xs">
        <li>
          <span className="text-sm font-semibold">OnDemand CPU:</span>
          <span className="text-muted-foreground"> {maxvCpus.onDemandCPUs} vCPUs</span>
        </li>
        <li>
          <span className="text-sm font-semibold">OnDemand GPU:</span>
          <span className="text-muted-foreground"> {maxvCpus.onDemandGPUs} vCPUs</span>
        </li>
        <li>
          <span className="text-sm font-semibold">Spot CPU:</span>
          <span className="text-muted-foreground"> {maxvCpus.spotCPUs} vCPUs</span>
        </li>
        <li>
          <span className="text-sm font-semibold">Spot GPU:</span>
          <span className="text-muted-foreground"> {maxvCpus.spotGPUs} vCPUs</span>
        </li>
      </ul>
    </div>
  );

}