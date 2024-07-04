import { CardDescription, CardTitle } from '@/components/ui/card'

interface DataTableHeaderProps {
    title: string
    description: string
}

const DataTableHeader = ({ title, description }: DataTableHeaderProps) => {
    return (
        <div>
            <CardTitle className="text-md">
                {title}
            </CardTitle>
            <CardDescription className="text-xs">
                {description}
            </CardDescription>
        </div>
    )
}

export default DataTableHeader