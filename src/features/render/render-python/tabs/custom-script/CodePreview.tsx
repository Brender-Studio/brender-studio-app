import { Label } from '@/components/ui/label'
import { readTextFile } from '@tauri-apps/api/fs'
import { useState, useEffect } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { readText, writeText } from '@tauri-apps/api/clipboard';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formRenderSchema } from '@/schemas/formRenderSchema';

SyntaxHighlighter.registerLanguage('python', python);

interface CodePreviewProps {
    form: UseFormReturn<z.infer<typeof formRenderSchema>>;
}

const CodePreview = ({ form }: CodePreviewProps) => {
    const [scriptContent, setScriptContent] = useState<string | undefined>(undefined);

    const readPythonScript = async (path: string) => {
        try {
            const content = await readTextFile(path)

            return content
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const fetchScriptContent = async () => {
            try {
                const content = await readPythonScript(form.watch('python_script_path') ?? '');
                setScriptContent(content);

                if (!content) {
                    toast({
                        title: "Error",
                        description: `Error loading Python script from ${form.watch('python_script_path')}`,
                        variant: "destructive"
                    })
                } else {
                    toast({
                        title: "Python script loaded",
                        description: `Python script loaded successfully from ${form.watch('python_script_path')}`,
                        variant: "success",
                        duration: 2000
                    })
                }

            } catch (error) {
                console.error(error)
                toast({
                    title: "Error",
                    description: `Error loading Python script from ${form.watch('python_script_path')}`,
                    variant: "destructive"
                })
            }
        };

        if (form.watch('python_script_path')) {
            fetchScriptContent();
        }
    }, [form.watch('python_script_path')]);

    const handleCopyScript = async (scriptText: string) => {
        await writeText(scriptText)
        const clipboard = await readText()
        console.log('Clipboard:', clipboard)
        toast({
            title: 'Copied to clipboard',
            description: 'The Python script has been copied to your clipboard',
            variant: 'success',
            duration: 2000,
        })
    }

    return (
        <div className='h-full relative'>
            {form.watch('python_script_path') && (
                <>
                    <Label>Python Script Preview</Label>
                    <div
                        className={form.watch('is_folder_python') ? ' mt-2  text-xs' : 'mt-2  text-xs'}
                    >
                        <Button
                            size='iconButton'
                            variant='ghost'
                            type='button'
                            className='absolute top-10 right-5'
                            onClick={() => handleCopyScript(scriptContent || '')}
                        >
                            <Copy size={16} />
                        </Button>
                        <SyntaxHighlighter language="python" style={a11yDark}
                            customStyle={{ backgroundColor: '#1a1a1a', padding: '1rem', borderRadius: '0.5rem', marginRight: '0.5rem', maxHeight: '60vh', overflowY: 'auto' }}
                            codeTagProps={{ className: 'no-code-style' }}
                            wrapLongLines={true}
                        >
                            {scriptContent || ''}
                        </SyntaxHighlighter>
                    </div>
                </>
            )}
            {!form.watch('python_script_path') && (
                <div className='h-full flex justify-center items-center'>
                    <p className='text-muted-foreground text-center text-xs'>
                        No Python script selected
                    </p>
                </div>
            )}
        </div>
    );
}

export default CodePreview