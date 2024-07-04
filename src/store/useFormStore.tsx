import { create } from "zustand";

interface useFormStoreState {
    currentScene: any;
    setCurrentScene: (scene: any) => void;
    allScenes: any;
    setAllScenes: (scenes: any) => void;
    isCustom: boolean;
    setIsCustom: (isCustom: boolean) => void;
    isFolder: boolean;
    setIsFolder: (isFolder: boolean) => void;
    filePath: string;
    setFilePath: (filePath: string) => void;
    folderPath: string;
    setFolderPath: (folderPath: string) => void;
    // python
    isFolderPython: boolean;
    setIsFolderPython: (isFolderPython: boolean) => void;
    pythonFilePath: string;
    setPythonFilePath: (pythonFilePath: string) => void;
    folderPathPython: string;
    setFolderPathPython: (folderPathPython: string) => void;
    pythonSelectOptions: any;
    setPythonSelectOptions: (options: any) => void;
    // --
    fileName: string;
    setFileName: (fileName: string) => void;
    blendSelectOptions: any;
    setBlendSelectOptions: (options: any) => void;
    selectedPaths: any;
    setSelectedPaths: (selectedPaths: any) => void;
    selectedPathsPython: any;
    setSelectedPathsPython: (selectedPathsPython: any) => void;
    isDataLoading: boolean;
    setIsDataLoading: (isLoading: boolean) => void;
    clearAllFormStates: () => void;
    clearFilePathFolderPaths: () => void;
}


export const useFormStore = create<useFormStoreState>((set) => ({
    currentScene: {},
    setCurrentScene: (scene) => set({ currentScene: scene }),
    allScenes: [],
    setAllScenes: (scenes) => set({ allScenes: scenes }),
    isCustom: false,
    setIsCustom: (isCustom) => set({ isCustom: isCustom }),
    isFolder: false,
    setIsFolder: (isFolder) => set({ isFolder: isFolder }),
    filePath: "",
    setFilePath: (filePath) => set({ filePath: filePath }),
    folderPath: "",
    setFolderPath: (folderPath) => set({ folderPath: folderPath }),
    // python
    isFolderPython: false,
    setIsFolderPython: (isFolderPython) => set({ isFolderPython: isFolderPython }),
    pythonFilePath: "",
    setPythonFilePath: (pythonFilePath) => set({ pythonFilePath: pythonFilePath }),
    folderPathPython: "",
    setFolderPathPython: (folderPathPython) => set({ folderPathPython: folderPathPython }),
    selectedPathsPython: {},
    setSelectedPathsPython: (selectedPathsPython) => set({ selectedPathsPython: selectedPathsPython }),
    pythonSelectOptions: [],
    setPythonSelectOptions: (options) => set({ pythonSelectOptions: options }),
    // --
    fileName: "",
    setFileName: (fileName) => set({ fileName: fileName }),
    blendSelectOptions: [],
    setBlendSelectOptions: (options) => set({ blendSelectOptions: options }),
    selectedPaths: {},
    setSelectedPaths: (selectedPaths) => set({ selectedPaths: selectedPaths }),
    isDataLoading: false,
    setIsDataLoading: (isLoading) => set({ isDataLoading: isLoading }),
    clearAllFormStates: () => set({
        currentScene: {},
        allScenes: [],
        isCustom: false,
        filePath: "",
        folderPath: "",
        fileName: "",
        blendSelectOptions: [],
        selectedPaths: {},
        isDataLoading: false,
        // isFolder: false
    }),
    clearFilePathFolderPaths: () => set({
        filePath: "",
        folderPath: ""
    })
}))

