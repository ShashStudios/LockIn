// Types for localStorage session management

export interface ActiveSession {
    startTime: number; // Epoch milliseconds
    duration: number; // Duration in minutes
    quitAttempts: number;
    brownNoise: boolean;
}

export interface SessionHistoryEntry {
    date: string; // ISO date string
    duration: number; // Duration in minutes
    completed: boolean;
    timestamp: number; // Epoch milliseconds for precise ordering
}

export interface UserPreferences {
    brownNoise: boolean;
    brownNoiseVolume: number; // 0-1 for Pro users
    lastDuration: number; // Last selected duration
    darkMode: boolean;
}

const STORAGE_KEYS = {
    ACTIVE_SESSION: "lockin_active_session",
    HISTORY: "lockin_history",
    PREFERENCES: "lockin_preferences",
} as const;

// Safe localStorage access (handles SSR)
function getItem(key: string): string | null {
    if (typeof window === "undefined") return null;
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
}

function setItem(key: string, value: string): void {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(key, value);
    } catch {
        console.warn("Failed to write to localStorage");
    }
}

function removeItem(key: string): void {
    if (typeof window === "undefined") return;
    try {
        localStorage.removeItem(key);
    } catch {
        console.warn("Failed to remove from localStorage");
    }
}

// Active Session Management
export function getActiveSession(): ActiveSession | null {
    const data = getItem(STORAGE_KEYS.ACTIVE_SESSION);
    if (!data) return null;

    try {
        const session = JSON.parse(data) as ActiveSession;

        // Validate session hasn't expired
        const endTime = session.startTime + session.duration * 60 * 1000;
        if (Date.now() > endTime) {
            // Session has expired, clear it
            clearActiveSession();
            return null;
        }

        return session;
    } catch {
        return null;
    }
}

export function setActiveSession(session: ActiveSession): void {
    setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(session));
}

export function clearActiveSession(): void {
    removeItem(STORAGE_KEYS.ACTIVE_SESSION);
}

export function incrementQuitAttempts(): number {
    const session = getActiveSession();
    if (!session) return 0;

    const newAttempts = session.quitAttempts + 1;
    setActiveSession({ ...session, quitAttempts: newAttempts });
    return newAttempts;
}

// Session History Management
export function getHistory(): SessionHistoryEntry[] {
    const data = getItem(STORAGE_KEYS.HISTORY);
    if (!data) return [];

    try {
        return JSON.parse(data) as SessionHistoryEntry[];
    } catch {
        return [];
    }
}

export function addToHistory(entry: Omit<SessionHistoryEntry, "timestamp">): void {
    const history = getHistory();
    const newEntry: SessionHistoryEntry = {
        ...entry,
        timestamp: Date.now(),
    };

    // Keep last 100 sessions
    const updatedHistory = [newEntry, ...history].slice(0, 100);
    setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedHistory));
}

export function clearHistory(): void {
    removeItem(STORAGE_KEYS.HISTORY);
}

// User Preferences
export function getPreferences(): UserPreferences {
    const data = getItem(STORAGE_KEYS.PREFERENCES);
    const defaults: UserPreferences = {
        brownNoise: false,
        brownNoiseVolume: 0.5,
        lastDuration: 25,
        darkMode: false,
    };

    if (!data) return defaults;

    try {
        return { ...defaults, ...JSON.parse(data) };
    } catch {
        return defaults;
    }
}

export function setPreferences(prefs: Partial<UserPreferences>): void {
    const current = getPreferences();
    setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify({ ...current, ...prefs }));
}

// Calculate remaining time for an active session
export function getRemainingTime(session: ActiveSession): number {
    const endTime = session.startTime + session.duration * 60 * 1000;
    const remaining = Math.max(0, endTime - Date.now());
    return Math.ceil(remaining / 1000); // Return seconds
}

// Check if session is complete
export function isSessionComplete(session: ActiveSession): boolean {
    return getRemainingTime(session) <= 0;
}

// ============ STATS HELPER FUNCTIONS ============

export interface DailyContribution {
    date: string; // YYYY-MM-DD
    minutes: number;
    sessions: number;
}

export interface UserStats {
    totalMinutes: number;
    totalSessions: number;
    completedSessions: number;
    quitCount: number;
    currentStreak: number;
    longestStreak: number;
}

// Get daily contributions for the last 365 days (for the GitHub-style graph)
export function getDailyContributions(): DailyContribution[] {
    const history = getHistory();
    const contributions: Map<string, DailyContribution> = new Map();

    // Initialize all days in the last 365 days with 0
    const today = new Date();
    for (let i = 0; i < 365; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split("T")[0];
        contributions.set(dateStr, { date: dateStr, minutes: 0, sessions: 0 });
    }

    // Fill in actual data from history
    history.forEach((entry) => {
        const dateStr = entry.date.split("T")[0];
        if (contributions.has(dateStr)) {
            const existing = contributions.get(dateStr)!;
            existing.minutes += entry.duration;
            existing.sessions += 1;
        }
    });

    // Convert to array and sort by date (oldest first)
    return Array.from(contributions.values()).sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
}

// Calculate user stats from history
export function getStats(): UserStats {
    const history = getHistory();

    const totalMinutes = history.reduce((sum, entry) => sum + entry.duration, 0);
    const totalSessions = history.length;
    const completedSessions = history.filter((entry) => entry.completed).length;
    const quitCount = history.filter((entry) => !entry.completed).length;

    // Calculate streaks
    const completedDates = new Set(
        history
            .filter((entry) => entry.completed)
            .map((entry) => entry.date.split("T")[0])
    );

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate current streak (consecutive days including today or yesterday)
    for (let i = 0; i < 365; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() - i);
        const dateStr = checkDate.toISOString().split("T")[0];

        if (completedDates.has(dateStr)) {
            if (i === 0 || i === 1 || currentStreak > 0) {
                currentStreak++;
            }
        } else if (i > 0) {
            // Break streak (but allow today to be missing)
            break;
        }
    }

    // Calculate longest streak
    const sortedDates = Array.from(completedDates).sort();
    for (let i = 0; i < sortedDates.length; i++) {
        if (i === 0) {
            tempStreak = 1;
        } else {
            const prevDate = new Date(sortedDates[i - 1]);
            const currDate = new Date(sortedDates[i]);
            const diffDays = Math.round(
                (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
            );

            if (diffDays === 1) {
                tempStreak++;
            } else {
                tempStreak = 1;
            }
        }
        longestStreak = Math.max(longestStreak, tempStreak);
    }

    return {
        totalMinutes,
        totalSessions,
        completedSessions,
        quitCount,
        currentStreak,
        longestStreak,
    };
}

