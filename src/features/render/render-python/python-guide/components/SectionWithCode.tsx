import SyntaxCode from '@/components/custom/code/SyntaxCode';

interface SectionWithCodeProps {
    title: string
    language: string
    code: string
    children?: React.ReactNode
}

const SectionWithCode = ({ title, language, code, children }: SectionWithCodeProps) => {
    return (
        <div className="space-y-2">
            <h3 className="font-semibold">{title}</h3>
            <SyntaxCode language={language} code={code} />
            {children}
        </div>
    );
}

export default SectionWithCode;