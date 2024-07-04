import { Button } from '@/components/ui/button'
import { open } from '@tauri-apps/api/shell'
import { Terminal } from 'lucide-react'

interface RedirectAwsButtonProps {
    linkAwsConsole: string
}

const RedirectAwsButton = ({ linkAwsConsole }: RedirectAwsButtonProps) => {
    return (
        <Button
            size='sm'
            variant='secondary'
            onClick={() => open(linkAwsConsole)}
            disabled={!linkAwsConsole}
        >
            <Terminal size={16} className='mr-2' />
            <span>View in AWS Console</span>
        </Button>
    )
}

export default RedirectAwsButton