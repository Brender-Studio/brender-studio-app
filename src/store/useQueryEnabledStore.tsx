import { create } from 'zustand';


type QueryEnabledStore = {
  isQueryEnabled: boolean;
  setIsQueryEnabled: (isQueryEnabled: boolean) => void;
};


export const useQueryEnabledStore = create<QueryEnabledStore>((set) => ({
  isQueryEnabled: false,
  setIsQueryEnabled: (isQueryEnabled: boolean) => set({ isQueryEnabled }),
}));