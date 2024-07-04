import React from 'react'

interface SectionHomeProps {
    title: string;
    content: React.ReactNode;
}

const SectionHome = ({ title, content }: SectionHomeProps) => {
    return (
        <div className="w-full">
            <div className={`flex gap-2 items-center w-full`} >
                <div className="flex gap-2 items-center">
                    <h2 className="font-semibold text-2xl text-center">{title}</h2>
                </div>
            </div>
            <div className='py-4'>
                {content}
            </div>
        </div>
    )
}

export default SectionHome