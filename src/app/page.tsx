"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUser, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
    getPreferences,
    setPreferences,
    setActiveSession,
    getActiveSession,
} from "@/lib/storage";

export default function HomePage() {
    const router = useRouter();
    const { isLoaded, isSignedIn } = useUser();
    const [duration, setDuration] = useState(15);
    const [brownNoise, setBrownNoise] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ready, setReady] = useState(false);
    const [showBlurb, setShowBlurb] = useState(false);
    const [typedText, setTypedText] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    const blurbText = "Research shows that short, focused work sessions of 10-30 minutes are more effective than long marathons. Your brain stays sharp, your focus stays strong.";

    useEffect(() => {
        setReady(true);
        const prefs = getPreferences();
        setBrownNoise(prefs.brownNoise);
        setDuration(prefs.lastDuration || 15);
        setDarkMode(prefs.darkMode || false);

        if (getActiveSession()) {
            router.push("/focus");
        }
    }, [router]);

    // Auto-start session on first sign-in (redirect from Clerk)
    useEffect(() => {
        if (isLoaded && isSignedIn && ready) {
            // Check if we came from sign-in by looking at URL params or sessionStorage
            const justSignedIn = sessionStorage.getItem("lockin_pending_start");
            if (justSignedIn) {
                sessionStorage.removeItem("lockin_pending_start");
                startSession();
            }
        }
    }, [isLoaded, isSignedIn, ready]);

    // Typing animation effect
    useEffect(() => {
        if (!showBlurb) {
            setTypedText("");
            return;
        }

        let index = 0;
        const interval = setInterval(() => {
            if (index < blurbText.length) {
                setTypedText(blurbText.slice(0, index + 1));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 20);

        return () => clearInterval(interval);
    }, [showBlurb]);

    const startSession = useCallback(() => {
        setLoading(true);
        setPreferences({ brownNoise, lastDuration: duration, darkMode });
        setActiveSession({
            startTime: Date.now(),
            duration,
            quitAttempts: 0,
            brownNoise,
        });
        router.push("/focus");
    }, [brownNoise, duration, darkMode, router]);

    const handleSignInClick = () => {
        // Set flag so we know to start session after sign-in
        sessionStorage.setItem("lockin_pending_start", "true");
    };

    const toggleDarkMode = () => {
        const newVal = !darkMode;
        setDarkMode(newVal);
        setPreferences({ darkMode: newVal });
    };

    const bg = darkMode ? "#0E0E0E" : "#FAFAF9";
    const text = darkMode ? "#FAFAF9" : "#0E0E0E";
    const textSecondary = darkMode ? "#A0A0A0" : "#6B6B6B";
    const border = darkMode ? "#333" : "#E5E5E3";

    if (!ready || !isLoaded) {
        return (
            <div style={{
                minHeight: '100vh', background: bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <div className="spinner" />
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 2rem',
            transition: 'background 0.3s ease'
        }}>
            {/* Top bar with dark mode toggle and profile */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 24px',
                zIndex: 10
            }}>
                {/* Dark mode toggle - left */}
                <button
                    onClick={toggleDarkMode}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 8,
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        color: textSecondary,
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

                {/* Profile / Sign out - right */}
                <SignedIn>
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                avatarBox: {
                                    width: 36,
                                    height: 36
                                }
                            }
                        }}
                    />
                </SignedIn>
                <SignedOut>
                    <div style={{ width: 36 }} /> {/* Spacer for alignment */}
                </SignedOut>
            </div>

            <div style={{ width: '100%', maxWidth: 520, textAlign: 'center' }} className="fade-in">
                <h1 style={{
                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                    fontWeight: 600,
                    color: text,
                    marginBottom: 12,
                    transition: 'color 0.3s'
                }}>
                    Time to focus
                </h1>
                <p style={{
                    fontSize: '1.125rem',
                    color: textSecondary,
                    marginBottom: 40,
                    transition: 'color 0.3s'
                }}>
                    Pick a duration and get started.
                </p>

                <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 24 }}>
                    {[15, 25, 30].map((min) => {
                        const isSelected = duration === min;
                        return (
                            <button
                                key={min}
                                onClick={() => setDuration(min)}
                                style={{
                                    minHeight: 60,
                                    minWidth: 100,
                                    padding: '0 24px',
                                    background: isSelected
                                        ? (darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)')
                                        : 'transparent',
                                    border: `2px solid ${isSelected ? (darkMode ? '#FFF' : '#000') : border}`,
                                    borderRadius: 14,
                                    fontSize: '1.125rem',
                                    fontWeight: 500,
                                    color: isSelected ? (darkMode ? '#FFF' : '#000') : textSecondary,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {min} min
                            </button>
                        );
                    })}
                </div>

                {/* Expandable blurb */}
                <div style={{ marginBottom: 32 }}>
                    <button
                        onClick={() => setShowBlurb(!showBlurb)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: textSecondary,
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            transition: 'color 0.2s'
                        }}
                    >
                        {showBlurb ? "Hide" : "Why short sessions?"}
                    </button>

                    {showBlurb && (
                        <div style={{ marginTop: 16, padding: '0 20px', minHeight: 60 }}>
                            <p style={{ fontSize: '0.9375rem', color: textSecondary, lineHeight: 1.7 }}>
                                {typedText}
                                <span style={{
                                    opacity: typedText.length < blurbText.length ? 1 : 0,
                                    animation: 'blink 0.8s infinite'
                                }}>|</span>
                            </p>
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 40 }}>
                    <button
                        onClick={() => {
                            const val = !brownNoise;
                            setBrownNoise(val);
                            setPreferences({ brownNoise: val });
                        }}
                        style={{
                            width: 56,
                            height: 32,
                            background: brownNoise ? (darkMode ? '#FFF' : '#000') : border,
                            border: 'none',
                            borderRadius: 16,
                            position: 'relative',
                            cursor: 'pointer',
                            transition: 'background 0.25s'
                        }}
                    >
                        <span style={{
                            position: 'absolute',
                            top: 3,
                            left: brownNoise ? 27 : 3,
                            width: 26,
                            height: 26,
                            background: brownNoise ? (darkMode ? '#000' : '#FFF') : 'white',
                            borderRadius: '50%',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'left 0.25s'
                        }} />
                    </button>
                    <span style={{ fontSize: '1rem', color: textSecondary }}>Brown noise</span>
                </div>

                {/* Show different buttons based on auth state */}
                <SignedOut>
                    <SignInButton mode="modal" forceRedirectUrl="/">
                        <button
                            onClick={handleSignInClick}
                            disabled={loading}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: 56,
                                padding: '0 40px',
                                background: text,
                                color: bg,
                                fontSize: '1.0625rem',
                                fontWeight: 500,
                                border: 'none',
                                borderRadius: 14,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                opacity: loading ? 0.5 : 1
                            }}
                        >
                            Start
                        </button>
                    </SignInButton>
                </SignedOut>

                <SignedIn>
                    <button
                        onClick={startSession}
                        disabled={loading}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: 56,
                            padding: '0 40px',
                            background: text,
                            color: bg,
                            fontSize: '1.0625rem',
                            fontWeight: 500,
                            border: 'none',
                            borderRadius: 14,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            opacity: loading ? 0.5 : 1
                        }}
                    >
                        Start
                    </button>
                </SignedIn>

                <p style={{
                    marginTop: 32,
                    fontSize: '0.8125rem',
                    color: darkMode ? '#555' : '#A0A0A0'
                }}>
                    Free forever. Sign in to start.
                </p>
            </div>

            <style jsx>{`
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `}</style>
        </div>
    );
}
