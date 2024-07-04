import { FooterButton } from '@/components/ui/button'
import { useUserSessionStore } from '@/store/useSessionStore';

const CliButton = () => {
    const { getSessionData } = useUserSessionStore();
    const { isCliInstalled, cliVersion } = getSessionData();
    
    return (
        <FooterButton size='footer' variant="footer" className="text-muted-foreground hover:bg-transparent cursor-default gap-2 flex items-center">
            {isCliInstalled ? <div className="w-2 h-2 bg-green-500 rounded-full"></div> : <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
            <small className="text-muted-foreground text-xs">
                {isCliInstalled ? `AWS CLI v${cliVersion}` : 'AWS CLI not installed'}
            </small>
        </FooterButton>
    )
}

export default CliButton