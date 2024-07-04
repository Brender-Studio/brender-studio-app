import { useEffect, useState } from "react";

const usePlatform = () => {
    const [currentPlatform, setCurrentPlatform] = useState('');

    useEffect(() => {
        const getPlatform = () => {
            const userAgent = window.navigator.userAgent;
            if (userAgent.indexOf("Win") !== -1) {
                return "Windows";
            } else if (userAgent.indexOf("Mac") !== -1) {
                return "Macintosh";
            } else if (userAgent.indexOf("Linux") !== -1) {
                return "Linux";
            } else {
                return "Unknown";
            }
        };

        const platform = getPlatform();
        setCurrentPlatform(platform);
    }, []);

    return currentPlatform;
};

export default usePlatform;
