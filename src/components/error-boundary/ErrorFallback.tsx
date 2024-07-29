import { Copy } from 'lucide-react'
import { Button } from '../ui/button'
import { toast } from '../ui/use-toast'
import { useNavigate } from 'react-router-dom'

interface ErrorFallbackProps {
    error: Error
    resetErrorBoundary: () => void
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
    const navigate = useNavigate()


    const handleRealoadAnRestoreLocalStorage = () => {
        localStorage.clear()
        window.location.reload()
        navigate('/')
    }

    const handleCopyError = (errorText: string) => {
        navigator.clipboard.writeText(errorText)
        toast({
            title: 'Copied to clipboard',
            description: 'The error message has been copied to your clipboard',
            variant: 'success',
            duration: 2000,
        })
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className='flex flex-col items-center space-y-8'>
                <h1 className="text-3xl font-semibold">Oops! Something went wrong.
                </h1>
                <div className='grid grid-cols-2 gap-2'>
                    <Button onClick={resetErrorBoundary}>Try again</Button>
                    <Button variant='secondary' onClick={handleRealoadAnRestoreLocalStorage}>Reload and Restore Data</Button>
                </div>

                <div className='relative w-full p-6'>
                    <Button
                        size='iconButton'
                        variant='ghost'
                        className='absolute top-0 right-0'
                        onClick={() => handleCopyError(error.message)}
                    >
                        <Copy size={16} />
                    </Button>
                    <pre className="text-red-500 text-wrap px-6 overflow-y-scroll max-h-72 mx-auto max-w-[900px]">
                        {window.location.href} {' '}
                        {error.message} 
                    </pre>
                </div>
            </div>
        </div>
    )
}

export default ErrorFallback