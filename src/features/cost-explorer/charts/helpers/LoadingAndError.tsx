import SpinnerButton from "@/components/custom/spinners/SpinnerButton";
import NoResultsFound from "../structure/NoResultsFound";

export const LoadingSpinner = () => (
    <div className="min-h-[368px] h-[368px] flex justify-center items-center">
      <SpinnerButton />
    </div>
  );
  
  export const NoResults = () => (
    <div className="min-h-[368px] h-[368px] w-full flex justify-center items-center">
      <NoResultsFound />
    </div>
  );