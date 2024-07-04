
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { open } from '@tauri-apps/api/shell';
import { useNavigate } from "react-router-dom";

interface HomeCardProps {
    data: {
        title: string;
        description: string;
        alt: string;
        isExternal: boolean;
        icon: React.ReactNode;
        path: string;
    }
    height: string;
}

const HomeCard = ({ data, height }: HomeCardProps) => {
    const navigate = useNavigate()


    const handleRedirect = (path: string, isExternal: boolean) => {
        if (isExternal) {
            open(path)
        } else {
            navigate(path)
        }
    }

    return (
        // relative h-72 hover:bg-accent 
        <Card className={`relative h-${height} hover:bg-accent`}
        >
            <CardHeader>
                <CardTitle>{data.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>{data.description}</CardDescription>
            </CardContent>
            <CardFooter className="absolute bottom-0 w-full">
                <Button
                    onClick={() => handleRedirect(data.path, data.isExternal)}
                    className="w-full rounded-sm" variant={!data.isExternal ? 'default' : 'secondary'} size="default">
                    <span className="mr-2">
                        {data.icon}
                    </span>
                    {data.alt}
                </Button>
            </CardFooter>
        </Card>

    )
}

export default HomeCard