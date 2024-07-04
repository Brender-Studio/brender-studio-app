
interface SectionProps {
    title: string
    children: React.ReactNode
}

const Section = ({ title, children }: SectionProps) => {
    return (
        <div className='space-y-2'>
            <h3 className="font-semibold">{title}</h3>
            {children}
        </div>
    );
}

export default Section;