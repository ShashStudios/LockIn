"use client";

import { useState, useCallback, useEffect } from "react";

interface UseFullscreenReturn {
    isFullscreen: boolean;
    enterFullscreen: () => Promise<void>;
    exitFullscreen: () => Promise<void>;
    toggleFullscreen: () => Promise<void>;
    isSupported: boolean;
}

export function useFullscreen(): UseFullscreenReturn {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isSupported, setIsSupported] = useState(false);

    useEffect(() => {
        setIsSupported(!!document.documentElement.requestFullscreen);

        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    const enterFullscreen = useCallback(async () => {
        if (!isSupported) return;

        try {
            await document.documentElement.requestFullscreen();
        } catch (err) {
            console.warn("Failed to enter fullscreen:", err);
        }
    }, [isSupported]);

    const exitFullscreen = useCallback(async () => {
        if (!document.fullscreenElement) return;

        try {
            await document.exitFullscreen();
        } catch (err) {
            console.warn("Failed to exit fullscreen:", err);
        }
    }, []);

    const toggleFullscreen = useCallback(async () => {
        if (isFullscreen) {
            await exitFullscreen();
        } else {
            await enterFullscreen();
        }
    }, [isFullscreen, enterFullscreen, exitFullscreen]);

    return {
        isFullscreen,
        enterFullscreen,
        exitFullscreen,
        toggleFullscreen,
        isSupported,
    };
}
