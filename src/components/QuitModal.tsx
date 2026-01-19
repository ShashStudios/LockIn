"use client";

import { useState, useEffect, useCallback } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface QuitModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirmQuit: () => void;
    isPro?: boolean;
}

const DELAY_SECONDS = 12; // Delay before button becomes active
const REQUIRED_TEXT = "LOCK IN";

const CALMING_MESSAGES = [
    "You're closer than you think.",
    "The best work happens in the last stretch.",
    "This moment of resistance is where growth lives.",
    "One more push. You've got this.",
];

export function QuitModal({ isOpen, onClose, onConfirmQuit, isPro = false }: QuitModalProps) {
    const [countdown, setCountdown] = useState(DELAY_SECONDS);
    const [inputText, setInputText] = useState("");
    const [messageIndex, setMessageIndex] = useState(0);

    const delay = isPro ? DELAY_SECONDS + 3 : DELAY_SECONDS; // Pro users get stronger friction

    const canQuit = countdown <= 0 && inputText.toUpperCase() === REQUIRED_TEXT;

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setCountdown(delay);
            setInputText("");
            setMessageIndex(0);
        }
    }, [isOpen, delay]);

    // Countdown timer
    useEffect(() => {
        if (!isOpen || countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown((prev) => Math.max(0, prev - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, [isOpen, countdown]);

    // Rotate calming messages
    useEffect(() => {
        if (!isOpen || countdown <= 0) return;

        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % CALMING_MESSAGES.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isOpen, countdown]);

    const handleQuit = useCallback(() => {
        if (canQuit) {
            onConfirmQuit();
        }
    }, [canQuit, onConfirmQuit]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="text-center space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-white">
                        Are you quitting for a real reason?
                    </h2>
                    <p className="text-surface-400 text-sm">
                        Taking breaks is fine. Giving up isn&apos;t.
                    </p>
                </div>

                {/* Calming message during countdown */}
                {countdown > 0 && (
                    <div className="py-6">
                        <p className="text-primary-400 text-lg font-medium animate-pulse-soft">
                            {CALMING_MESSAGES[messageIndex]}
                        </p>
                        <p className="text-surface-500 text-sm mt-4">
                            Confirm available in {countdown}s
                        </p>
                    </div>
                )}

                {/* Input section - appears when countdown is done */}
                {countdown <= 0 && (
                    <div className="space-y-3 py-4">
                        <p className="text-surface-300 text-sm">
                            Type <span className="font-mono font-bold text-white">{REQUIRED_TEXT}</span> to confirm:
                        </p>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type here..."
                            className="w-full px-4 py-3 bg-surface-800 border border-surface-600 rounded-xl text-center text-white placeholder:text-surface-500 focus:outline-none focus:border-primary-500 font-mono uppercase tracking-widest"
                            autoFocus
                        />
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                    <Button
                        variant="secondary"
                        className="flex-1"
                        onClick={onClose}
                    >
                        Keep Going
                    </Button>
                    <Button
                        variant="danger"
                        className="flex-1"
                        disabled={!canQuit}
                        onClick={handleQuit}
                    >
                        {countdown > 0 ? `Wait ${countdown}s` : canQuit ? "Quit Session" : "Type to confirm"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
