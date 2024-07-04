import {  CardContent, CardFooter, CardHeader, CardTitleCharts } from "@/components/ui/card"
import { ReactNode } from "react"

interface SectionCostExplorerProps {
    cardContent: ReactNode
    tableSection?: ReactNode
    cardFooter?: ReactNode
    cardHeader?: ReactNode
    cardTitle?: ReactNode
}


const SectionCostExplorer = ({ cardContent, tableSection, cardFooter, cardHeader, cardTitle }: SectionCostExplorerProps) => {

    return (
        <>
            <div className="py-4">
                    <CardTitleCharts>
                        {cardTitle}
                    </CardTitleCharts>
                    <CardHeader className="px-0 pb-0">
                        {cardHeader}
                    </CardHeader>
                    <CardContent className="px-0 py-6">
                        {cardContent}
                    </CardContent>
                    <CardFooter className="mt-4 p-0">
                        {cardFooter}
                    </CardFooter>
                
            </div>
            {tableSection && (
                <div>
                    {tableSection}
                </div>
            )}
        </>
    );
}

export default SectionCostExplorer