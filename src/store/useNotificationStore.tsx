import { create } from "zustand";

interface useNotificationStoreState {
    codeBuildNotifications: any[];
    batchJobsNotifications: any[];
    setBatchJobsNotifications: (notifications: any[]) => void;
    addBatchJobsNotification: (notification: any) => void;
    removeBatchJobsNotification: (notification: any) => void;
    setCodeBuildNotifications: (notifications: any[]) => void;
    addCodeBuildNotification: (notification: any) => void;
    removeCodeBuildNotification: (notification: any) => void;
    clearCodeBuildNotifications: () => void;
}

export const useNotificationStore = create<useNotificationStoreState>((set) => ({
    // Batch Jobs
    batchJobsNotifications: [],
    setBatchJobsNotifications: (notifications) => set({ batchJobsNotifications: notifications }),
    addBatchJobsNotification: (notification) => set((state) => ({ batchJobsNotifications: [...state.batchJobsNotifications, notification] })),
    removeBatchJobsNotification: (notification) => set((state) => ({ batchJobsNotifications: state.batchJobsNotifications.filter((n) => n.id !== notification.id) })),
    // CodeBuild
    codeBuildNotifications: [],
    setCodeBuildNotifications: (notifications) => set({ codeBuildNotifications: notifications }),
    addCodeBuildNotification: (notification) => set((state) => ({ codeBuildNotifications: [...state.codeBuildNotifications, notification] })),
    removeCodeBuildNotification: (notification) => set((state) => ({ codeBuildNotifications: state.codeBuildNotifications.filter((n) => n.id !== notification.id) })),
    // Clear CodeBuild
    clearCodeBuildNotifications: () => set({ codeBuildNotifications: [] }),
    // Clear Batch Jobs
    clearBatchJobsNotifications: () => set({ batchJobsNotifications: [] }),
}));
