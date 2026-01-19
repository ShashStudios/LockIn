"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getActiveSession, getRemainingTime, isSessionComplete } from "@/lib/storage";

interface UseTimerReturn {
    seconds: number;
    isComplete: boolean;
    isRunning: boolean;
    progress: number; // 0-100
}

export function useTimer(): UseTimerReturn {
    const [seconds, setSeconds] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [totalDuration, setTotalDuration] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const updateTimer = useCallback(() => {
        const session = getActiveSession();

        if (!session) {
            setIsRunning(false);
            setSeconds(0);
            return;
        }

        setIsRunning(true);
        setTotalDuration(session.duration * 60);

        if (isSessionComplete(session)) {
            setIsComplete(true);
            setSeconds(0);
            setIsRunning(false);
        } else {
            const remaining = getRemainingTime(session);
            setSeconds(remaining);
            setIsComplete(false);
        }
    }, []);

    useEffect(() => {
        // Initial update
        updateTimer();

        // Update every second using timestamp-based calculation
        intervalRef.current = setInterval(updateTimer, 1000);

        // Handle visibility change (tab switching)
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                updateTimer();
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [updateTimer]);

    const progress = totalDuration > 0
        ? ((totalDuration - seconds) / totalDuration) * 100
        : 0;

    return {
        seconds,
        isComplete,
        isRunning,
        progress,
    };
}
