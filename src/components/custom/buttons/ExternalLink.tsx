import { Button } from '@/components/ui/button'
import { open } from '@tauri-apps/api/shell'
import { ExternalLinkIcon } from 'lucide-react'

interface ExternalLinkProps {
    link: string
    title: string
}

const ExternalLink = ({ link, title }: ExternalLinkProps) => {
    return (
        <Button
            size='link'
            variant='link'
            onClick={() => open(link)}
            disabled={!link}
            className='text-blue-500'
        >
            <span className='inline-flex text-xs'>
                {title}
                <ExternalLinkIcon size={16} className='ml-2' />
            </span>
        </Button>
    )
}

export default ExternalLink