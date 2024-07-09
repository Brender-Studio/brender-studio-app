import { create } from "zustand";

interface CodeBuildNotification {
    id: string;
    buildStatus: string;
    arn: string;
    startTime: string;
    stackName: string;
}

interface useNotificationStoreState {
    codeBuildNotifications: CodeBuildNotification[];
    setCodeBuildNotifications: (notifications: CodeBuildNotification[]) => void;
    addCodeBuildNotification: (notification: CodeBuildNotification) => void;
    removeCodeBuildNotification: (notification: CodeBuildNotification) => void;
    clearCodeBuildNotifications: () => void;
}

export const useNotificationStore = create<useNotificationStoreState>((set) => ({
    // CodeBuild
    codeBuildNotifications: [],
    setCodeBuildNotifications: (notifications) => set({ codeBuildNotifications: notifications }),
    addCodeBuildNotification: (notification) => set((state) => ({ codeBuildNotifications: [...state.codeBuildNotifications, notification] })),
    removeCodeBuildNotification: (notification) => set((state) => ({ codeBuildNotifications: state.codeBuildNotifications.filter((n) => n.id !== notification.id) })),
    // Clear CodeBuild
    clearCodeBuildNotifications: () => set({ codeBuildNotifications: [] }),
}));
