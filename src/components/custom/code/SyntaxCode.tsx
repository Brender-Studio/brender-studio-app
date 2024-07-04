import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import yml from 'react-syntax-highlighter/dist/esm/languages/hljs/yaml';
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';

SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('yml', yml);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('json', json);


interface SyntaxCodeProps {
    code: string
    language: string
}


const SyntaxCode = ({ code, language }: SyntaxCodeProps) => {
    return (
        <div className='text-xs max-w-[790px]'>
            <SyntaxHighlighter language={language} style={a11yDark}
                customStyle={{ backgroundColor: '#1a1a1a', padding: '1rem', borderRadius: '0.5rem'}}
                codeTagProps={{ className: 'no-code-style' }}
                // wrapLines={true}
                wrapLongLines={true}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}

export default SyntaxCode;