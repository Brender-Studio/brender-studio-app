import { Button } from "@/components/ui/button";
import { Loader2, RefreshCcw } from "lucide-react";

interface RefreshButtonProps {
    onClick: () => void;
    isRefreshing: boolean;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ onClick, isRefreshing }) => {
    return (
        <Button size='iconButton' variant='outline' onClick={onClick} disabled={isRefreshing}>
            {isRefreshing ? <Loader2 size={16} className="animate-spin" /> : <RefreshCcw size={16} />}
        </Button>
    );
};

export default RefreshButton;