import { FooterButton } from '@/components/ui/button'
import { open } from '@tauri-apps/api/shell'
import { Heart } from 'lucide-react'

const SupportButton = () => {

    const handleSupport = () => {
        const url = 'https://www.brenderstudio.com'
        open(url)
    }

    return (
        <FooterButton onClick={handleSupport} size='footer' variant="footer" className="text-muted-foreground ">
            Support
            <Heart size={16} className="ml-1" fill="#F63652" stroke="none" />
        </FooterButton>
    )
}

export default SupportButton