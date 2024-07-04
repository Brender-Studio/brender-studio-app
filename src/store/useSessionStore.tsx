import { create } from 'zustand';

interface SessionStore {
    getSessionData: () => SessionData;
    setSessionData: (sessionData: SessionData) => void;
}

interface SessionData {
    currentProfile: string | null;
    profiles: string[];
    currentAwsRegion: string;
    currentStack: string | null;
    isCliInstalled: boolean;
    cliVersion: string | null;
}

const getSessionDataFromLocalStorage = (): SessionData => {
    const sessionDataString = localStorage.getItem("sessionData");
    if (sessionDataString) {
        return JSON.parse(sessionDataString);
    }
    return {
        currentProfile: null,
        profiles: [],
        currentAwsRegion: "us-east-1",
        currentStack: null,
        isCliInstalled: false,
        cliVersion: null
    };
};

const setSessionDataToLocalStorage = (sessionData: SessionData) => {
    localStorage.setItem("sessionData", JSON.stringify(sessionData));
};

export const useUserSessionStore = create<SessionStore>((set) => ({
    getSessionData: () => getSessionDataFromLocalStorage(),
    setSessionData: (sessionData: SessionData) => {
        set((state) => ({ ...state, sessionData }));
        setSessionDataToLocalStorage(sessionData);
    }
}));

