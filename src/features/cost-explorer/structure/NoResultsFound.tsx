import TooltipInfo from "@/components/custom/tooltip/TooltipInfo";
import { useLocation } from "react-router-dom";

const NoResultsFound = () => {
    const { pathname } = useLocation();

    return (
        <div className="flex items-center gap-2">
            <p className="text-muted-foreground text-center">No Data Available</p>
            {pathname === "/cost-explorer" && (
                <TooltipInfo
                    title="No Data Available"
                    description="If you have expenses associated with a newly created stack and they are not displayed, it may take up to 24 hours for the data to appear."
                />
            )}
        </div>
    );
};

export default NoResultsFound;
