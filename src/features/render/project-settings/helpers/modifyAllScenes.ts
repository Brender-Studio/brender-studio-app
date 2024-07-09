import { Scene } from "../ProjectSettings.types";
import { addPlaceholderIfNotExists } from "./addPlaceholderIfNotExists";

export const modifyAllScenes = (data: Scene[]): Scene[] => {
    // Map through all scenes and add placeholders if necessary
    const modifiedData = data.map(addPlaceholderIfNotExists);

    return modifiedData;
};