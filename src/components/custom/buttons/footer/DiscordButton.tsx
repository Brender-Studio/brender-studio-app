import { FooterButton } from '@/components/ui/button'
import DiscordIcon from '../../icons/DiscordIcon'
import { open } from '@tauri-apps/api/shell'

const DiscordButton = () => {

    const handleDiscord = () => {
        const url = 'https://discord.gg/z7sBb4J5r5'
        open(url)
    }

    return (
        <FooterButton onClick={handleDiscord} size='footer' variant="footer" className="text-muted-foreground ">
            <span className="mr-1">
                Discord
            </span>
            <DiscordIcon marginRight='0' />
        </FooterButton>
    )
}

export default DiscordButton