import { useUserSessionStore } from '@/store/useSessionStore';

const WelcomeBack = () => {
    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentStack, currentProfile } = sessionData;

    return (
        <div className="w-full flex flex-col justify-center items-center space-y-3 py-8">
            <h1 className="text-center font-semibold text-4xl">Welcome back! {currentProfile}</h1>
            <p className="text-center text-muted-foreground text-sm">
                You are currently using the stack <span className='font-semibold'>{currentStack}</span>. Let's get started with your next render!
            </p>
        </div>
    )
}

export default WelcomeBack