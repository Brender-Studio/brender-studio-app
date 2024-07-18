import { Button } from "@/components/ui/button";
import { ChevronLeft} from "lucide-react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import TooltipInfo from "../tooltip/TooltipInfo";
import HoverCardInfo from "../tooltip/HoverCardInfo";

type SectionProps = {
    title: string;
    content: ReactNode;
    backBtn?: boolean;
    justify: 'center' | 'start' | 'end' | 'between' | 'around' | 'evenly' | 'stretch';
    tooltip_description?: string;
    hover_card_title?: string;
    hover_card_content?: string;
    hover_card_children?: ReactNode;
};

const Section = ({ title, content, backBtn, justify, tooltip_description ,hover_card_title, hover_card_children, hover_card_content}: SectionProps) => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <div className="w-full">
            <div className={`flex justify-${justify} gap-2 items-center w-full`}
            >
                {
                    backBtn && (
                        <Button
                            className="mr-2"
                            variant='outline'
                            size="icon"
                            onClick={handleBack}
                        >
                            <ChevronLeft size={16} />
                        </Button>
                    )
                }
                <div className="flex gap-2 items-center">
                    <h2 className="font-semibold text-2xl text-center">{title}</h2>
                    {tooltip_description && <TooltipInfo title={title} description={tooltip_description} align="start" />}
                    {
                        hover_card_title && (
                            <HoverCardInfo
                                title={hover_card_title!}
                                content={hover_card_content!}
                                children={hover_card_children}
                            />
                        )
                    }
                </div>
            </div>
            <div className="pb-4">
                {content}
            </div>
        </div>
    )
}

export default Section