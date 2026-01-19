(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/storage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Types for localStorage session management
__turbopack_context__.s([
    "addToHistory",
    ()=>addToHistory,
    "clearActiveSession",
    ()=>clearActiveSession,
    "clearHistory",
    ()=>clearHistory,
    "getActiveSession",
    ()=>getActiveSession,
    "getHistory",
    ()=>getHistory,
    "getPreferences",
    ()=>getPreferences,
    "getRemainingTime",
    ()=>getRemainingTime,
    "incrementQuitAttempts",
    ()=>incrementQuitAttempts,
    "isSessionComplete",
    ()=>isSessionComplete,
    "setActiveSession",
    ()=>setActiveSession,
    "setPreferences",
    ()=>setPreferences
]);
const STORAGE_KEYS = {
    ACTIVE_SESSION: "lockin_active_session",
    HISTORY: "lockin_history",
    PREFERENCES: "lockin_preferences"
};
// Safe localStorage access (handles SSR)
function getItem(key) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return localStorage.getItem(key);
    } catch  {
        return null;
    }
}
function setItem(key, value) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        localStorage.setItem(key, value);
    } catch  {
        console.warn("Failed to write to localStorage");
    }
}
function removeItem(key) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        localStorage.removeItem(key);
    } catch  {
        console.warn("Failed to remove from localStorage");
    }
}
function getActiveSession() {
    const data = getItem(STORAGE_KEYS.ACTIVE_SESSION);
    if (!data) return null;
    try {
        const session = JSON.parse(data);
        // Validate session hasn't expired
        const endTime = session.startTime + session.duration * 60 * 1000;
        if (Date.now() > endTime) {
            // Session has expired, clear it
            clearActiveSession();
            return null;
        }
        return session;
    } catch  {
        return null;
    }
}
function setActiveSession(session) {
    setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(session));
}
function clearActiveSession() {
    removeItem(STORAGE_KEYS.ACTIVE_SESSION);
}
function incrementQuitAttempts() {
    const session = getActiveSession();
    if (!session) return 0;
    const newAttempts = session.quitAttempts + 1;
    setActiveSession({
        ...session,
        quitAttempts: newAttempts
    });
    return newAttempts;
}
function getHistory() {
    const data = getItem(STORAGE_KEYS.HISTORY);
    if (!data) return [];
    try {
        return JSON.parse(data);
    } catch  {
        return [];
    }
}
function addToHistory(entry) {
    const history = getHistory();
    const newEntry = {
        ...entry,
        timestamp: Date.now()
    };
    // Keep last 100 sessions
    const updatedHistory = [
        newEntry,
        ...history
    ].slice(0, 100);
    setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedHistory));
}
function clearHistory() {
    removeItem(STORAGE_KEYS.HISTORY);
}
function getPreferences() {
    const data = getItem(STORAGE_KEYS.PREFERENCES);
    const defaults = {
        brownNoise: false,
        brownNoiseVolume: 0.5,
        lastDuration: 25
    };
    if (!data) return defaults;
    try {
        return {
            ...defaults,
            ...JSON.parse(data)
        };
    } catch  {
        return defaults;
    }
}
function setPreferences(prefs) {
    const current = getPreferences();
    setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify({
        ...current,
        ...prefs
    }));
}
function getRemainingTime(session) {
    const endTime = session.startTime + session.duration * 60 * 1000;
    const remaining = Math.max(0, endTime - Date.now());
    return Math.ceil(remaining / 1000); // Return seconds
}
function isSessionComplete(session) {
    return getRemainingTime(session) <= 0;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useTimer.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTimer",
    ()=>useTimer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/storage.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useTimer() {
    _s();
    const [seconds, setSeconds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isComplete, setIsComplete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isRunning, setIsRunning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [totalDuration, setTotalDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const updateTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTimer.useCallback[updateTimer]": ()=>{
            const session = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveSession"])();
            if (!session) {
                setIsRunning(false);
                setSeconds(0);
                return;
            }
            setIsRunning(true);
            setTotalDuration(session.duration * 60);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSessionComplete"])(session)) {
                setIsComplete(true);
                setSeconds(0);
                setIsRunning(false);
            } else {
                const remaining = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRemainingTime"])(session);
                setSeconds(remaining);
                setIsComplete(false);
            }
        }
    }["useTimer.useCallback[updateTimer]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTimer.useEffect": ()=>{
            // Initial update
            updateTimer();
            // Update every second using timestamp-based calculation
            intervalRef.current = setInterval(updateTimer, 1000);
            // Handle visibility change (tab switching)
            const handleVisibilityChange = {
                "useTimer.useEffect.handleVisibilityChange": ()=>{
                    if (document.visibilityState === "visible") {
                        updateTimer();
                    }
                }
            }["useTimer.useEffect.handleVisibilityChange"];
            document.addEventListener("visibilitychange", handleVisibilityChange);
            return ({
                "useTimer.useEffect": ()=>{
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }
                    document.removeEventListener("visibilitychange", handleVisibilityChange);
                }
            })["useTimer.useEffect"];
        }
    }["useTimer.useEffect"], [
        updateTimer
    ]);
    const progress = totalDuration > 0 ? (totalDuration - seconds) / totalDuration * 100 : 0;
    return {
        seconds,
        isComplete,
        isRunning,
        progress
    };
}
_s(useTimer, "LG82DwG6/zE+xXhZZ9lgadqNE+s=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useFullscreen.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFullscreen",
    ()=>useFullscreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function useFullscreen() {
    _s();
    const [isFullscreen, setIsFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSupported, setIsSupported] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useFullscreen.useEffect": ()=>{
            setIsSupported(!!document.documentElement.requestFullscreen);
            const handleFullscreenChange = {
                "useFullscreen.useEffect.handleFullscreenChange": ()=>{
                    setIsFullscreen(!!document.fullscreenElement);
                }
            }["useFullscreen.useEffect.handleFullscreenChange"];
            document.addEventListener("fullscreenchange", handleFullscreenChange);
            return ({
                "useFullscreen.useEffect": ()=>{
                    document.removeEventListener("fullscreenchange", handleFullscreenChange);
                }
            })["useFullscreen.useEffect"];
        }
    }["useFullscreen.useEffect"], []);
    const enterFullscreen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFullscreen.useCallback[enterFullscreen]": async ()=>{
            if (!isSupported) return;
            try {
                await document.documentElement.requestFullscreen();
            } catch (err) {
                console.warn("Failed to enter fullscreen:", err);
            }
        }
    }["useFullscreen.useCallback[enterFullscreen]"], [
        isSupported
    ]);
    const exitFullscreen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFullscreen.useCallback[exitFullscreen]": async ()=>{
            if (!document.fullscreenElement) return;
            try {
                await document.exitFullscreen();
            } catch (err) {
                console.warn("Failed to exit fullscreen:", err);
            }
        }
    }["useFullscreen.useCallback[exitFullscreen]"], []);
    const toggleFullscreen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFullscreen.useCallback[toggleFullscreen]": async ()=>{
            if (isFullscreen) {
                await exitFullscreen();
            } else {
                await enterFullscreen();
            }
        }
    }["useFullscreen.useCallback[toggleFullscreen]"], [
        isFullscreen,
        enterFullscreen,
        exitFullscreen
    ]);
    return {
        isFullscreen,
        enterFullscreen,
        exitFullscreen,
        toggleFullscreen,
        isSupported
    };
}
_s(useFullscreen, "FrTS2faRbGCxSbGe+F0Zn3O9uxU=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/BrownNoisePlayer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BrownNoisePlayer",
    ()=>BrownNoisePlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function BrownNoisePlayer({ isPlaying, volume = 0.5 }) {
    _s();
    const audioContextRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const noiseNodeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const gainNodeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BrownNoisePlayer.useEffect": ()=>{
            // Only create audio context on first play
            if (!isPlaying) {
                // Stop and clean up
                if (noiseNodeRef.current) {
                    noiseNodeRef.current.stop();
                    noiseNodeRef.current.disconnect();
                    noiseNodeRef.current = null;
                }
                return;
            }
            // Create audio context if needed (must be done after user interaction)
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }
            const audioContext = audioContextRef.current;
            // Create gain node for volume control
            if (!gainNodeRef.current) {
                gainNodeRef.current = audioContext.createGain();
                gainNodeRef.current.connect(audioContext.destination);
            }
            gainNodeRef.current.gain.value = volume * 0.3; // Reduce volume
            // Generate brown noise buffer
            const bufferSize = audioContext.sampleRate * 5; // 5 seconds of noise
            const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
            const data = buffer.getChannelData(0);
            let lastOut = 0;
            for(let i = 0; i < bufferSize; i++){
                const white = Math.random() * 2 - 1;
                // Brown noise: integrate white noise
                lastOut = (lastOut + 0.02 * white) / 1.02;
                data[i] = lastOut * 3.5; // Amplify
            }
            // Create and play the noise source
            const noiseNode = audioContext.createBufferSource();
            noiseNode.buffer = buffer;
            noiseNode.loop = true;
            noiseNode.connect(gainNodeRef.current);
            noiseNode.start();
            noiseNodeRef.current = noiseNode;
            return ({
                "BrownNoisePlayer.useEffect": ()=>{
                    if (noiseNodeRef.current) {
                        noiseNodeRef.current.stop();
                        noiseNodeRef.current.disconnect();
                        noiseNodeRef.current = null;
                    }
                }
            })["BrownNoisePlayer.useEffect"];
        }
    }["BrownNoisePlayer.useEffect"], [
        isPlaying,
        volume
    ]);
    // Update volume
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BrownNoisePlayer.useEffect": ()=>{
            if (gainNodeRef.current) {
                gainNodeRef.current.gain.value = volume * 0.3;
            }
        }
    }["BrownNoisePlayer.useEffect"], [
        volume
    ]);
    return null; // No UI, just manages audio
}
_s(BrownNoisePlayer, "pdfaeCG8TZO42JvDsTppVx39rlU=");
_c = BrownNoisePlayer;
var _c;
__turbopack_context__.k.register(_c, "BrownNoisePlayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "formatDate",
    ()=>formatDate,
    "formatDateTime",
    ()=>formatDateTime,
    "formatDuration",
    ()=>formatDuration,
    "formatTime",
    ()=>formatTime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
function formatDuration(minutes) {
    if (minutes < 60) {
        return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}
function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    }).format(date);
}
function formatDateTime(date) {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    }).format(date);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/focus/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FocusPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTimer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useTimer.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFullscreen$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useFullscreen.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BrownNoisePlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BrownNoisePlayer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function FocusPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { seconds, isComplete, progress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTimer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimer"])();
    const { enterFullscreen, exitFullscreen, isSupported } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFullscreen$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFullscreen"])();
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [countdown, setCountdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    const [typed, setTyped] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [brownNoise, setBrownNoise] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sessionDuration, setSessionDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [darkMode, setDarkMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FocusPage.useEffect": ()=>{
            setReady(true);
            const session = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveSession"])();
            if (!session) {
                router.push("/");
                return;
            }
            setBrownNoise(session.brownNoise);
            setSessionDuration(session.duration);
            const prefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPreferences"])();
            setDarkMode(prefs.darkMode || false);
            if (isSupported) {
                setTimeout({
                    "FocusPage.useEffect": ()=>enterFullscreen()
                }["FocusPage.useEffect"], 300);
            }
        }
    }["FocusPage.useEffect"], [
        router,
        enterFullscreen,
        isSupported
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FocusPage.useEffect": ()=>{
            if (isComplete && ready) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToHistory"])({
                    date: new Date().toISOString().split("T")[0],
                    duration: sessionDuration,
                    completed: true
                });
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearActiveSession"])();
                exitFullscreen();
                router.push("/complete");
            }
        }
    }["FocusPage.useEffect"], [
        isComplete,
        ready,
        sessionDuration,
        exitFullscreen,
        router
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FocusPage.useEffect": ()=>{
            if (!showModal || countdown <= 0) return;
            const t = setInterval({
                "FocusPage.useEffect.t": ()=>setCountdown({
                        "FocusPage.useEffect.t": (c)=>Math.max(0, c - 1)
                    }["FocusPage.useEffect.t"])
            }["FocusPage.useEffect.t"], 1000);
            return ({
                "FocusPage.useEffect": ()=>clearInterval(t)
            })["FocusPage.useEffect"];
        }
    }["FocusPage.useEffect"], [
        showModal,
        countdown
    ]);
    const openModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FocusPage.useCallback[openModal]": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["incrementQuitAttempts"])();
            setCountdown(10);
            setTyped("");
            setShowModal(true);
        }
    }["FocusPage.useCallback[openModal]"], []);
    const quit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FocusPage.useCallback[quit]": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToHistory"])({
                date: new Date().toISOString().split("T")[0],
                duration: sessionDuration,
                completed: false
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearActiveSession"])();
            exitFullscreen();
            router.push("/");
        }
    }["FocusPage.useCallback[quit]"], [
        sessionDuration,
        exitFullscreen,
        router
    ]);
    const toggleDarkMode = ()=>{
        const newVal = !darkMode;
        setDarkMode(newVal);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setPreferences"])({
            darkMode: newVal
        });
    };
    const canQuit = countdown <= 0 && typed.toUpperCase() === "QUIT";
    const bg = darkMode ? "#0E0E0E" : "#FAFAF9";
    const text = darkMode ? "#FAFAF9" : "#0E0E0E";
    const textSecondary = darkMode ? "#888" : "#666";
    const textMuted = darkMode ? "#555" : "#999";
    if (!ready) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                position: 'fixed',
                inset: 0,
                background: bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "spinner"
            }, void 0, false, {
                fileName: "[project]/src/app/focus/page.tsx",
                lineNumber: 105,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/focus/page.tsx",
            lineNumber: 101,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            inset: 0,
            background: bg,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.3s ease'
        },
        className: "jsx-1ea94cb43a76cfe9",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BrownNoisePlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrownNoisePlayer"], {
                isPlaying: brownNoise,
                volume: 0.5,
                showVolumeControl: false
            }, void 0, false, {
                fileName: "[project]/src/app/focus/page.tsx",
                lineNumber: 121,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: toggleDarkMode,
                style: {
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
                },
                className: "jsx-1ea94cb43a76cfe9",
                children: darkMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    className: "jsx-1ea94cb43a76cfe9",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: "12",
                            cy: "12",
                            r: "5",
                            className: "jsx-1ea94cb43a76cfe9"
                        }, void 0, false, {
                            fileName: "[project]/src/app/focus/page.tsx",
                            lineNumber: 145,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42",
                            className: "jsx-1ea94cb43a76cfe9"
                        }, void 0, false, {
                            fileName: "[project]/src/app/focus/page.tsx",
                            lineNumber: 146,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/focus/page.tsx",
                    lineNumber: 144,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    className: "jsx-1ea94cb43a76cfe9",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
                        className: "jsx-1ea94cb43a76cfe9"
                    }, void 0, false, {
                        fileName: "[project]/src/app/focus/page.tsx",
                        lineNumber: 150,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/focus/page.tsx",
                    lineNumber: 149,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/focus/page.tsx",
                lineNumber: 124,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-1ea94cb43a76cfe9" + " " + "text-center fade-in",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 'clamp(5rem, 20vw, 12rem)',
                            fontWeight: 500,
                            fontVariantNumeric: 'tabular-nums',
                            letterSpacing: '-0.04em',
                            color: text,
                            lineHeight: 1,
                            transition: 'color 0.3s ease'
                        },
                        className: "jsx-1ea94cb43a76cfe9",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime"])(seconds)
                    }, void 0, false, {
                        fileName: "[project]/src/app/focus/page.tsx",
                        lineNumber: 157,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            marginTop: 32,
                            fontSize: '1.125rem',
                            color: textSecondary,
                            transition: 'color 0.3s ease'
                        },
                        className: "jsx-1ea94cb43a76cfe9",
                        children: "Stay with it"
                    }, void 0, false, {
                        fileName: "[project]/src/app/focus/page.tsx",
                        lineNumber: 168,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/focus/page.tsx",
                lineNumber: 156,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: openModal,
                style: {
                    position: 'absolute',
                    bottom: 48,
                    background: 'none',
                    border: 'none',
                    fontSize: '1rem',
                    color: textMuted,
                    cursor: 'pointer',
                    padding: '12px 24px',
                    transition: 'color 0.2s'
                },
                className: "jsx-1ea94cb43a76cfe9",
                children: "End session"
            }, void 0, false, {
                fileName: "[project]/src/app/focus/page.tsx",
                lineNumber: 178,
                columnNumber: 13
            }, this),
            showModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
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
                },
                className: "jsx-1ea94cb43a76cfe9",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: darkMode ? '#1C1C1E' : '#FFFFFF',
                        borderRadius: 20,
                        padding: '36px 32px 32px',
                        maxWidth: 380,
                        width: '100%',
                        textAlign: 'center',
                        boxShadow: darkMode ? '0 25px 60px rgba(0,0,0,0.5)' : '0 25px 60px rgba(0,0,0,0.15)',
                        animation: 'scaleIn 0.25s ease'
                    },
                    className: "jsx-1ea94cb43a76cfe9",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowModal(false),
                            style: {
                                position: 'absolute',
                                top: 16,
                                right: 16,
                                background: 'none',
                                border: 'none',
                                color: textMuted,
                                cursor: 'pointer',
                                padding: 4
                            },
                            className: "jsx-1ea94cb43a76cfe9",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "20",
                                height: "20",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                className: "jsx-1ea94cb43a76cfe9",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M18 6L6 18M6 6l12 12",
                                    className: "jsx-1ea94cb43a76cfe9"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/focus/page.tsx",
                                    lineNumber: 237,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/focus/page.tsx",
                                lineNumber: 236,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/focus/page.tsx",
                            lineNumber: 223,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                fontSize: '1.625rem',
                                fontWeight: 600,
                                color: darkMode ? '#FFF' : '#000',
                                marginBottom: 8,
                                letterSpacing: '-0.02em'
                            },
                            className: "jsx-1ea94cb43a76cfe9",
                            children: "End session?"
                        }, void 0, false, {
                            fileName: "[project]/src/app/focus/page.tsx",
                            lineNumber: 241,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                color: textSecondary,
                                fontSize: '1rem',
                                lineHeight: 1.5
                            },
                            className: "jsx-1ea94cb43a76cfe9",
                            children: "Take a breath. You've got this."
                        }, void 0, false, {
                            fileName: "[project]/src/app/focus/page.tsx",
                            lineNumber: 250,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginTop: 28,
                                padding: '20px 0',
                                borderTop: `1px solid ${darkMode ? '#333' : '#EEE'}`,
                                borderBottom: countdown <= 0 ? `1px solid ${darkMode ? '#333' : '#EEE'}` : 'none'
                            },
                            className: "jsx-1ea94cb43a76cfe9",
                            children: countdown > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-1ea94cb43a76cfe9",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: textMuted,
                                            fontSize: '0.9375rem',
                                            marginBottom: 12
                                        },
                                        className: "jsx-1ea94cb43a76cfe9",
                                        children: "Cool down period"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/focus/page.tsx",
                                        lineNumber: 266,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '2.5rem',
                                            fontWeight: 600,
                                            fontVariantNumeric: 'tabular-nums',
                                            color: darkMode ? '#FFF' : '#000'
                                        },
                                        className: "jsx-1ea94cb43a76cfe9",
                                        children: countdown
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/focus/page.tsx",
                                        lineNumber: 273,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: textMuted,
                                            fontSize: '0.8125rem',
                                            marginTop: 8
                                        },
                                        className: "jsx-1ea94cb43a76cfe9",
                                        children: "seconds"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/focus/page.tsx",
                                        lineNumber: 281,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/focus/page.tsx",
                                lineNumber: 265,
                                columnNumber: 33
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    paddingBottom: 8
                                },
                                className: "jsx-1ea94cb43a76cfe9",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            marginBottom: 16,
                                            color: textSecondary,
                                            fontSize: '0.9375rem'
                                        },
                                        className: "jsx-1ea94cb43a76cfe9",
                                        children: [
                                            "Type ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontWeight: 600,
                                                    color: darkMode ? '#FFF' : '#000',
                                                    letterSpacing: '0.05em'
                                                },
                                                className: "jsx-1ea94cb43a76cfe9",
                                                children: "QUIT"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/focus/page.tsx",
                                                lineNumber: 296,
                                                columnNumber: 46
                                            }, this),
                                            " to confirm"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/focus/page.tsx",
                                        lineNumber: 291,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: typed,
                                        onChange: (e)=>setTyped(e.target.value),
                                        placeholder: "Type here...",
                                        autoFocus: true,
                                        style: {
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
                                        },
                                        onFocus: (e)=>e.target.style.borderColor = '#2D5A3D',
                                        onBlur: (e)=>e.target.style.borderColor = darkMode ? '#333' : '#E5E5E5',
                                        className: "jsx-1ea94cb43a76cfe9"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/focus/page.tsx",
                                        lineNumber: 302,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/focus/page.tsx",
                                lineNumber: 290,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/focus/page.tsx",
                            lineNumber: 258,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: 12,
                                marginTop: 24
                            },
                            className: "jsx-1ea94cb43a76cfe9",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowModal(false),
                                    style: {
                                        height: 52,
                                        background: darkMode ? '#FFF' : '#000',
                                        color: darkMode ? '#000' : '#FFF',
                                        fontSize: '0.9375rem',
                                        fontWeight: 600,
                                        border: 'none',
                                        borderRadius: 12,
                                        cursor: 'pointer',
                                        transition: 'transform 0.15s, opacity 0.15s'
                                    },
                                    onMouseOver: (e)=>e.currentTarget.style.opacity = '0.9',
                                    onMouseOut: (e)=>e.currentTarget.style.opacity = '1',
                                    className: "jsx-1ea94cb43a76cfe9",
                                    children: "Keep going"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/focus/page.tsx",
                                    lineNumber: 338,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: quit,
                                    disabled: !canQuit,
                                    style: {
                                        height: 52,
                                        background: 'transparent',
                                        color: canQuit ? '#E53935' : textMuted,
                                        fontSize: '0.9375rem',
                                        fontWeight: 500,
                                        border: `2px solid ${canQuit ? '#E53935' : darkMode ? '#333' : '#E5E5E5'}`,
                                        borderRadius: 12,
                                        cursor: canQuit ? 'pointer' : 'not-allowed',
                                        transition: 'all 0.2s',
                                        opacity: canQuit ? 1 : 0.5
                                    },
                                    className: "jsx-1ea94cb43a76cfe9",
                                    children: "End session"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/focus/page.tsx",
                                    lineNumber: 356,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/focus/page.tsx",
                            lineNumber: 332,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/focus/page.tsx",
                    lineNumber: 210,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/focus/page.tsx",
                lineNumber: 197,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "1ea94cb43a76cfe9",
                children: "@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes scaleIn{0%{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/focus/page.tsx",
        lineNumber: 111,
        columnNumber: 9
    }, this);
}
_s(FocusPage, "GzVMip6OTz1RDclH9TlKIXhZkv0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTimer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimer"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFullscreen$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFullscreen"]
    ];
});
_c = FocusPage;
var _c;
__turbopack_context__.k.register(_c, "FocusPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_18e9e57d._.js.map