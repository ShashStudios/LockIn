"use client";

import { formatTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface TimerProps {
    seconds: number;
    className?: string;
}

export function Timer({ seconds, className }: TimerProps) {
    return (
        <div
            className={cn(
                "timer-display text-8xl md:text-9xl font-light text-white tracking-tight",
                className
            )}
        >
            {formatTime(seconds)}
        </div>
    );
}
