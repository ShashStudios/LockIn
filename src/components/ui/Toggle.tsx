"use client";

import { cn } from "@/lib/utils";

interface ToggleProps {
    enabled: boolean;
    onChange: (enabled: boolean) => void;
    label?: string;
    disabled?: boolean;
    className?: string;
}

export function Toggle({ enabled, onChange, label, disabled, className }: ToggleProps) {
    return (
        <label
            className={cn(
                "inline-flex items-center gap-3 cursor-pointer select-none",
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
        >
            <button
                type="button"
                role="switch"
                aria-checked={enabled}
                disabled={disabled}
                onClick={() => !disabled && onChange(!enabled)}
                className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus-ring",
                    enabled ? "bg-primary-600" : "bg-surface-700"
                )}
            >
                <span
                    className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200",
                        enabled ? "translate-x-6" : "translate-x-1"
                    )}
                />
            </button>
            {label && (
                <span className="text-sm text-surface-300">{label}</span>
            )}
        </label>
    );
}
