import { listen } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";

export const useFiledropHover = () => {
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const fileDropHoverListener = listen("tauri://file-drop-hover", () => {
            setIsHovering(true);
        });

        const fileDropCancelledListener = listen("tauri://file-drop-cancelled", () => {
            setIsHovering(false);
        });

        const fileDropListener = listen("tauri://file-drop", () => {
            setIsHovering(false);
        });

        return () => {
            fileDropHoverListener.then((unsubscribe) => unsubscribe());
            fileDropCancelledListener.then((unsubscribe) => unsubscribe());
            fileDropListener.then((unsubscribe) => unsubscribe());
        };
    }, []); 

    return { isHovering };
};
