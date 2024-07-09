import RedirectAwsButton from "@/components/custom/buttons/RedirectAwsButton";
import TooltipInfo from "@/components/custom/tooltip/TooltipInfo";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";

interface CostExplorerHeaderProps {
    description: string;
    isSectionActive: boolean;
    onSwitchChange: () => void;
    linkAWSDailyConsole: string;
}



const CostExplorerHeader = ({ description, isSectionActive, onSwitchChange, linkAWSDailyConsole }: CostExplorerHeaderProps) => {
    return (
        <div className="flex justify-between items-center">
            <p className="text-muted-foreground text-sm">{description}</p>
            <div className="flex items-center gap-3">
                <RedirectAwsButton linkAwsConsole={linkAWSDailyConsole} />
                <Switch checked={isSectionActive} onCheckedChange={onSwitchChange} />
                <TooltipInfo
                    title="API Cost Explorer"
                    description="The API cost explorer incurs a cost of $0.01 per request. You have the option to enable or disable it. For more information, please refer to the AWS Documentation."
                    align="end"
                    footer={
                        <Link
                            to="https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-explorer.html"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 underline text-xs"
                        >
                            Learn more
                        </Link>
                    }
                />
            </div>
        </div>
    );
};

export default CostExplorerHeader