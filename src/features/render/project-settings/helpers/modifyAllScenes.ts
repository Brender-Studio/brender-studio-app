import { Sceneform } from "../ProjectSettings.types";
import { addPlaceholderIfNotExists } from "./addPlaceholderIfNotExists";

export const modifyAllScenes = (data: Sceneform[]): Sceneform[] => {
    // Map through all scenes and add placeholders if necessary
    const modifiedData = data.map(addPlaceholderIfNotExists);

    return modifiedData;
};