"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTimer } from "@/hooks/useTimer";
import { useFullscreen } from "@/hooks/useFullscreen";
import { BrownNoisePlayer } from "@/components/BrownNoisePlayer";
import {
    getActiveSession,
    clearActiveSession,
    incrementQuitAttempts,
    addToHistory,
    getPreferences,
    setPreferences,
} from "@/lib/storage";
import { formatTime } from "@/lib/utils";

export default function FocusPage() {
    const router = useRouter();
    const { seconds, isComplete, progress } = useTimer();
    const { enterFullscreen, exitFullscreen, isSupported } = useFullscreen();

    const [showModal, setShowModal] = useState(false);
    const [countdown, setCountdown] = useState(10);
    const [typed, setTyped] = useState("");
    const [brownNoise, setBrownNoise] = useState(false);
    const [ready, setReady] = useState(false);
    const [sessionDuration, setSessionDuration] = useState(0);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        setReady(true);
        const session = getActiveSession();
        if (!session) {
            router.push("/");
            return;
        }
        setBrownNoise(session.brownNoise);
        setSessionDuration(session.duration);

        const prefs = getPreferences();
        setDarkMode(prefs.darkMode || false);

        if (isSupported) {
            setTimeout(() => enterFullscreen(), 300);
        }
    }, [router, enterFullscreen, isSupported]);

    useEffect(() => {
        if (isComplete && ready) {
            addToHistory({
                date: new Date().toISOString().split("T")[0],
                duration: sessionDuration,
                completed: true,
            });
            clearActiveSession();
            exitFullscreen();
            router.push("/complete");
        }
    }, [isComplete, ready, sessionDuration, exitFullscreen, router]);

    useEffect(() => {
        if (!showModal || countdown <= 0) return;
        const t = setInterval(() => setCountdown((c) => Math.max(0, c - 1)), 1000);
        return () => clearInterval(t);
    }, [showModal, countdown]);

    const openModal = useCallback(() => {
        incrementQuitAttempts();
        setCountdown(10);
        setTyped("");
        setShowModal(true);
    }, []);

    const quit = useCallback(() => {
        addToHistory({
            date: new Date().toISOString().split("T")[0],
            duration: sessionDuration,
            completed: false,
        });
        clearActiveSession();
        exitFullscreen();
        router.push("/");
    }, [sessionDuration, exitFullscreen, router]);

    const toggleDarkMode = () => {
        const newVal = !darkMode;
        setDarkMode(newVal);
        setPreferences({ darkMode: newVal });
    };

    const canQuit = countdown <= 0 && typed.toUpperCase() === "QUIT";

    const bg = darkMode ? "#0E0E0E" : "#FAFAF9";
    const text = darkMode ? "#FAFAF9" : "#0E0E0E";
    const textSecondary = darkMode ? "#888" : "#666";
    const textMuted = darkMode ? "#555" : "#999";

    if (!ready) {
        return (
            <div style={{
                position: 'fixed', inset: 0, background: bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <div className="spinner" />
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: bg,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.3s ease'
        }}>
            <BrownNoisePlayer isPlaying={brownNoise} volume={0.5} showVolumeControl={false} />

            {/* Dark mode toggle - top left */}
            <button
                onClick={toggleDarkMode}
                style={{
                    position: 'absolute',
                    top: 24,
                    left: 24,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 8,
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    color: textSecondary,
                    fontSize: '0.875rem',
                    transition: 'color 0.2s'
                }}
            >
                {darkMode ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </svg>
                ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                )}
            </button>

            {/* Timer - just text, no circle */}
            <div className="text-center fade-in">
                <div style={{
                    fontSize: 'clamp(5rem, 20vw, 12rem)',
                    fontWeight: 500,
                    fontVariantNumeric: 'tabular-nums',
                    letterSpacing: '-0.04em',
                    color: text,
                    lineHeight: 1,
                    transition: 'color 0.3s ease'
                }}>
                    {formatTime(seconds)}
                </div>
                <p style={{
                    marginTop: 32,
                    fontSize: '1.125rem',
                    color: textSecondary,
                    transition: 'color 0.3s ease'
                }}>
                    Stay with it
                </p>
            </div>

            <button
                onClick={openModal}
                style={{
                    position: 'absolute',
                    bottom: 48,
                    background: 'none',
                    border: 'none',
                    fontSize: '1rem',
                    color: textMuted,
                    cursor: 'pointer',
                    padding: '12px 24px',
                    transition: 'color 0.2s'
                }}
            >
                End session
            </button>

            {/* Styled Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 24,
                    zIndex: 100,
                    animation: 'fadeIn 0.2s ease'
                }}>
                    <div style={{
                        background: darkMode ? '#1C1C1E' : '#FFFFFF',
                        borderRadius: 20,
                        padding: '36px 32px 32px',
                        maxWidth: 380,
                        width: '100%',
                        textAlign: 'center',
                        boxShadow: darkMode
                            ? '0 25px 60px rgba(0,0,0,0.5)'
                            : '0 25px 60px rgba(0,0,0,0.15)',
                        animation: 'scaleIn 0.25s ease'
                    }}>
                        {/* Close button */}
                        <button
                            onClick={() => setShowModal(false)}
                            style={{
                                position: 'absolute',
                                top: 16,
                                right: 16,
                                background: 'none',
                                border: 'none',
                                color: textMuted,
                                cursor: 'pointer',
                                padding: 4
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 style={{
                            fontSize: '1.625rem',
                            fontWeight: 600,
                            color: darkMode ? '#FFF' : '#000',
                            marginBottom: 8,
                            letterSpacing: '-0.02em'
                        }}>
                            End session?
                        </h2>
                        <p style={{
                            color: textSecondary,
                            fontSize: '1rem',
                            lineHeight: 1.5
                        }}>
                            Take a breath. You've got this.
                        </p>

                        <div style={{
                            marginTop: 28,
                            padding: '20px 0',
                            borderTop: `1px solid ${darkMode ? '#333' : '#EEE'}`,
                            borderBottom: countdown <= 0 ? `1px solid ${darkMode ? '#333' : '#EEE'}` : 'none'
                        }}>
                            {countdown > 0 ? (
                                <div>
                                    <p style={{
                                        color: textMuted,
                                        fontSize: '0.9375rem',
                                        marginBottom: 12
                                    }}>
                                        Cool down period
                                    </p>
                                    <div style={{
                                        fontSize: '2.5rem',
                                        fontWeight: 600,
                                        fontVariantNumeric: 'tabular-nums',
                                        color: darkMode ? '#FFF' : '#000'
                                    }}>
                                        {countdown}
                                    </div>
                                    <p style={{
                                        color: textMuted,
                                        fontSize: '0.8125rem',
                                        marginTop: 8
                                    }}>
                                        seconds
                                    </p>
                                </div>
                            ) : (
                                <div style={{ paddingBottom: 8 }}>
                                    <p style={{
                                        marginBottom: 16,
                                        color: textSecondary,
                                        fontSize: '0.9375rem'
                                    }}>
                                        Type <span style={{
                                            fontWeight: 600,
                                            color: darkMode ? '#FFF' : '#000',
                                            letterSpacing: '0.05em'
                                        }}>QUIT</span> to confirm
                                    </p>
                                    <input
                                        type="text"
                                        value={typed}
                                        onChange={(e) => setTyped(e.target.value)}
                                        placeholder="Type here..."
                                        autoFocus
                                        style={{
                                            width: '100%',
                                            height: 52,
                                            padding: '0 20px',
                                            background: darkMode ? '#0E0E0E' : '#F5F5F5',
                                            border: `2px solid ${darkMode ? '#333' : '#E5E5E5'}`,
                                            borderRadius: 12,
                                            fontSize: '1rem',
                                            fontFamily: 'inherit',
                                            fontWeight: 500,
                                            color: darkMode ? '#FFF' : '#000',
                                            textAlign: 'center',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.15em',
                                            outline: 'none',
                                            transition: 'border-color 0.2s'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#2D5A3D'}
                                        onBlur={(e) => e.target.style.borderColor = darkMode ? '#333' : '#E5E5E5'}
                                    />
                                </div>
                            )}
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 12,
                            marginTop: 24
                        }}>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    height: 52,
                                    background: darkMode ? '#FFF' : '#000',
                                    color: darkMode ? '#000' : '#FFF',
                                    fontSize: '0.9375rem',
                                    fontWeight: 600,
                                    border: 'none',
                                    borderRadius: 12,
                                    cursor: 'pointer',
                                    transition: 'transform 0.15s, opacity 0.15s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                            >
                                Keep going
                            </button>
                            <button
                                onClick={quit}
                                disabled={!canQuit}
                                style={{
                                    height: 52,
                                    background: 'transparent',
                                    color: canQuit ? '#E53935' : textMuted,
                                    fontSize: '0.9375rem',
                                    fontWeight: 500,
                                    border: `2px solid ${canQuit ? '#E53935' : (darkMode ? '#333' : '#E5E5E5')}`,
                                    borderRadius: 12,
                                    cursor: canQuit ? 'pointer' : 'not-allowed',
                                    transition: 'all 0.2s',
                                    opacity: canQuit ? 1 : 0.5
                                }}
                            >
                                End session
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
        </div>
    );
}
