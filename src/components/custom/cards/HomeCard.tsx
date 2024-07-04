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
        img?: string;
    }
}

const HomeCard = ({ data }: HomeCardProps) => {
    const navigate = useNavigate()

    const handleRedirect = (path: string, isExternal: boolean) => {
        if (isExternal) {
            open(path)
        } else {
            navigate(path)
        }
    }

    return (
        <>
            <div
                key={data.title}
                className='border p-4 rounded-lg border-white/0.1 bg-card hover:shadow-xl flex gap-4 cursor-pointer'
                onClick={() => handleRedirect(data.path, data.isExternal)}
            >
                <div className='w-fit border border-white/0.1 rounded p-2 h-fit text-muted-foreground'>
                    {data.icon}
                </div>
                <div className='space-y-2'>
                    <h2 className='text-md font-semibold text-white'>
                        {data.title}
                    </h2>
                    <p className='text-xs text-muted-foreground md:text-sm'>
                        {data.description}
                    </p>
                </div>
            </div>
        </>
    )
}

export default HomeCard
