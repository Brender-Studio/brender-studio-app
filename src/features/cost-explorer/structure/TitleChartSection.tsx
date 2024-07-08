import TooltipInfo from '@/components/custom/tooltip/TooltipInfo'
import { Separator } from '@/components/ui/separator'


const TitleChartSection = ({ currentStack }: { currentStack: string }) => {
    return (
        <>
            <div className="py-6">
                <p className="text-neutral-300 font-medium text-sm flex items-center gap-2">
                    Cost and Usage Chart
                    <span>
                        {currentStack ?

                            <span className='font-semibold'>for {currentStack}</span>
                            : (
                                <div className='flex items-center'>
                                    <TooltipInfo iconWarning description='No stack selected. Please select a stack to view this section.' />
                                </div>
                            )
                        }
                    </span>
                </p>
            </div>
            <Separator />
        </>
    )
}

export default TitleChartSection