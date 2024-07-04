import { create } from 'zustand';



type SelectedTypeChart = {
  selectedType: string;
  setSelectedType: (type: string) => void;
};

export const useSelectedTypeChartStore = create<SelectedTypeChart>((set) => ({
  selectedType: 'bar', 
  setSelectedType: (type: string) => set({ selectedType: type }), 
}));
