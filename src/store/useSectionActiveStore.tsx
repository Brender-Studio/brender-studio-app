import { create } from 'zustand';

type SectionActiveStore = {
    isSectionActive: boolean;
    setSectionActive: (active: boolean) => void;
};

const isSectionActive = JSON.parse(localStorage.getItem('isSectionActive') || "false");

export const useSectionActiveStore = create<SectionActiveStore>((set) => ({
    isSectionActive: isSectionActive,
    setSectionActive: (active: boolean) => {
        set({ isSectionActive: active });
        localStorage.setItem('isSectionActive',  JSON.stringify(active));
    },
}));


