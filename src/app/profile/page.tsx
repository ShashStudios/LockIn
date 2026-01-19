"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { getStats, getDailyContributions, getPreferences, DailyContribution, UserStats } from "@/lib/storage";

export default function ProfilePage() {
    const { user, isLoaded } = useUser();
    const [darkMode, setDarkMode] = useState(false);
    const [stats, setStats] = useState<UserStats | null>(null);
    const [contributions, setContributions] = useState<DailyContribution[]>([]);
    const [hoveredDay, setHoveredDay] = useState<DailyContribution | null>(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const prefs = getPreferences();
        setDarkMode(prefs.darkMode || false);
        setStats(getStats());
        setContributions(getDailyContributions());
    }, []);

    const bg = darkMode ? "#000" : "#FFF";
    const text = darkMode ? "#FFF" : "#000";
    const textSecondary = darkMode ? "#888" : "#666";
    const border = darkMode ? "#222" : "#EEE";
    const cardBg = darkMode ? "#111" : "#F8F8F8";

    // Color scale for contributions (like GitHub)
    const getContributionColor = (minutes: number) => {
        if (minutes === 0) return darkMode ? "#161b22" : "#ebedf0";
        if (minutes < 30) return "#0e4429";
        if (minutes < 60) return "#006d32";
        if (minutes < 120) return "#26a641";
        return "#39d353";
    };

    // Format time
    const formatTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours === 0) return `${mins}m`;
        if (mins === 0) return `${hours}h`;
        return `${hours}h ${mins}m`;
    };

    // Generate weeks for the graph
    const generateWeeks = () => {
        const weeks: DailyContribution[][] = [];
        let currentWeek: DailyContribution[] = [];

        // Find the first Sunday to start the grid properly
        const startDate = new Date(contributions[0]?.date || new Date());
        const dayOfWeek = startDate.getDay();

        // Add empty cells for days before our data starts
        for (let i = 0; i < dayOfWeek; i++) {
            currentWeek.push({ date: "", minutes: -1, sessions: 0 });
        }

        contributions.forEach((day) => {
            currentWeek.push(day);
            if (currentWeek.length === 7) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
        });

        if (currentWeek.length > 0) {
            weeks.push(currentWeek);
        }

        return weeks;
    };

    // Get month labels
    const getMonthLabels = () => {
        const months: { month: string; weekIndex: number }[] = [];
        const weeks = generateWeeks();
        let lastMonth = "";

        weeks.forEach((week, weekIndex) => {
            const validDay = week.find((d) => d.date);
            if (validDay) {
                const date = new Date(validDay.date);
                const month = date.toLocaleString("default", { month: "short" });
                if (month !== lastMonth) {
                    months.push({ month, weekIndex });
                    lastMonth = month;
                }
            }
        });

        return months;
    };

    const weeks = generateWeeks();
    const monthLabels = getMonthLabels();

    if (!isLoaded) {
        return (
            <div style={{ minHeight: "100vh", background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p style={{ color: textSecondary }}>Loading...</p>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100vh", background: bg, transition: "background 0.3s ease" }}>
            {/* Header */}
            <header style={{
                padding: "24px 32px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                maxWidth: 900,
                margin: "0 auto"
            }}>
                <Link href="/" style={{ color: text, textDecoration: "none", fontSize: "0.9375rem", fontWeight: 500 }}>
                    ← LockIn
                </Link>
            </header>

            <main style={{ maxWidth: 900, margin: "0 auto", padding: "20px 24px 100px" }}>
                {/* Profile Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 48 }}>
                    {user?.imageUrl && (
                        <img
                            src={user.imageUrl}
                            alt="Profile"
                            style={{ width: 80, height: 80, borderRadius: "50%", border: `2px solid ${border}` }}
                        />
                    )}
                    <div>
                        <h1 style={{ fontSize: "1.75rem", fontWeight: 600, color: text, margin: 0, marginBottom: 4 }}>
                            {user?.firstName || user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] || "User"}
                        </h1>
                        <p style={{ color: textSecondary, margin: 0, fontSize: "0.9375rem" }}>
                            {user?.emailAddresses?.[0]?.emailAddress}
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: 16,
                    marginBottom: 48
                }}>
                    {/* Current Streak */}
                    <div style={{
                        background: cardBg,
                        borderRadius: 12,
                        padding: "24px 20px",
                        textAlign: "center"
                    }}>
                        <p style={{ color: textSecondary, fontSize: "0.8125rem", margin: 0, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            Current Streak
                        </p>
                        <p style={{ color: text, fontSize: "2rem", fontWeight: 600, margin: 0 }}>
                            🔥 {stats?.currentStreak || 0}
                        </p>
                        <p style={{ color: textSecondary, fontSize: "0.8125rem", margin: 0, marginTop: 4 }}>
                            days
                        </p>
                    </div>

                    {/* Total Focus Time */}
                    <div style={{
                        background: cardBg,
                        borderRadius: 12,
                        padding: "24px 20px",
                        textAlign: "center"
                    }}>
                        <p style={{ color: textSecondary, fontSize: "0.8125rem", margin: 0, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            Total Focus Time
                        </p>
                        <p style={{ color: text, fontSize: "2rem", fontWeight: 600, margin: 0 }}>
                            {formatTime(stats?.totalMinutes || 0)}
                        </p>
                        <p style={{ color: textSecondary, fontSize: "0.8125rem", margin: 0, marginTop: 4 }}>
                            {stats?.completedSessions || 0} of {stats?.totalSessions || 0} completed
                        </p>
                    </div>

                    {/* Longest Streak */}
                    <div style={{
                        background: cardBg,
                        borderRadius: 12,
                        padding: "24px 20px",
                        textAlign: "center"
                    }}>
                        <p style={{ color: textSecondary, fontSize: "0.8125rem", margin: 0, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            Longest Streak
                        </p>
                        <p style={{ color: text, fontSize: "2rem", fontWeight: 600, margin: 0 }}>
                            {stats?.longestStreak || 0}
                        </p>
                        <p style={{ color: textSecondary, fontSize: "0.8125rem", margin: 0, marginTop: 4 }}>
                            days
                        </p>
                    </div>

                    {/* Times Quit */}
                    <div style={{
                        background: cardBg,
                        borderRadius: 12,
                        padding: "24px 20px",
                        textAlign: "center"
                    }}>
                        <p style={{ color: textSecondary, fontSize: "0.8125rem", margin: 0, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            Times Quit
                        </p>
                        <p style={{ color: text, fontSize: "2rem", fontWeight: 600, margin: 0 }}>
                            {stats?.quitCount || 0}
                        </p>
                        <p style={{ color: textSecondary, fontSize: "0.8125rem", margin: 0, marginTop: 4 }}>
                            sessions
                        </p>
                    </div>
                </div>

                {/* Contribution Graph */}
                <div style={{
                    background: cardBg,
                    borderRadius: 12,
                    padding: "24px",
                    position: "relative"
                }}>
                    <p style={{ color: text, fontSize: "1rem", fontWeight: 500, margin: 0, marginBottom: 20 }}>
                        {stats?.completedSessions || 0} focus sessions in the last year
                    </p>

                    {/* Month Labels */}
                    <div style={{ display: "flex", marginLeft: 32, marginBottom: 8, gap: 0 }}>
                        {monthLabels.map((label, i) => (
                            <span
                                key={i}
                                style={{
                                    fontSize: "0.6875rem",
                                    color: textSecondary,
                                    position: "absolute",
                                    left: 32 + label.weekIndex * 14
                                }}
                            >
                                {label.month}
                            </span>
                        ))}
                    </div>

                    {/* Graph Grid */}
                    <div style={{ display: "flex", gap: 3, marginTop: 24, position: "relative" }}>
                        {/* Day Labels */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 3, marginRight: 8 }}>
                            <span style={{ fontSize: "0.625rem", color: textSecondary, height: 12, lineHeight: "12px" }}></span>
                            <span style={{ fontSize: "0.625rem", color: textSecondary, height: 12, lineHeight: "12px" }}>Mon</span>
                            <span style={{ fontSize: "0.625rem", color: textSecondary, height: 12, lineHeight: "12px" }}></span>
                            <span style={{ fontSize: "0.625rem", color: textSecondary, height: 12, lineHeight: "12px" }}>Wed</span>
                            <span style={{ fontSize: "0.625rem", color: textSecondary, height: 12, lineHeight: "12px" }}></span>
                            <span style={{ fontSize: "0.625rem", color: textSecondary, height: 12, lineHeight: "12px" }}>Fri</span>
                            <span style={{ fontSize: "0.625rem", color: textSecondary, height: 12, lineHeight: "12px" }}></span>
                        </div>

                        {/* Weeks */}
                        <div style={{ display: "flex", gap: 3, overflowX: "auto" }}>
                            {weeks.map((week, weekIndex) => (
                                <div key={weekIndex} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                    {week.map((day, dayIndex) => (
                                        <div
                                            key={dayIndex}
                                            style={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: 2,
                                                background: day.minutes === -1 ? "transparent" : getContributionColor(day.minutes),
                                                cursor: day.date ? "pointer" : "default"
                                            }}
                                            onMouseEnter={(e) => {
                                                if (day.date) {
                                                    setHoveredDay(day);
                                                    const rect = e.currentTarget.getBoundingClientRect();
                                                    setTooltipPos({ x: rect.left + window.scrollX, y: rect.top + window.scrollY - 40 });
                                                }
                                            }}
                                            onMouseLeave={() => setHoveredDay(null)}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Legend */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
                        <span style={{ fontSize: "0.6875rem", color: textSecondary }}>Less</span>
                        <div style={{ display: "flex", gap: 3 }}>
                            {[0, 15, 45, 90, 150].map((mins, i) => (
                                <div
                                    key={i}
                                    style={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: 2,
                                        background: getContributionColor(mins)
                                    }}
                                />
                            ))}
                        </div>
                        <span style={{ fontSize: "0.6875rem", color: textSecondary }}>More</span>
                    </div>

                    {/* Tooltip */}
                    {hoveredDay && (
                        <div
                            style={{
                                position: "fixed",
                                left: tooltipPos.x,
                                top: tooltipPos.y,
                                background: darkMode ? "#333" : "#24292f",
                                color: "#fff",
                                padding: "8px 12px",
                                borderRadius: 6,
                                fontSize: "0.75rem",
                                pointerEvents: "none",
                                zIndex: 1000,
                                whiteSpace: "nowrap"
                            }}
                        >
                            <strong>{hoveredDay.minutes > 0 ? formatTime(hoveredDay.minutes) : "No focus"}</strong>
                            {" on "}
                            {new Date(hoveredDay.date).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                            })}
                        </div>
                    )}
                </div>

                {/* Start Session CTA */}
                <div style={{ textAlign: "center", marginTop: 48 }}>
                    <Link
                        href="/"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "14px 32px",
                            background: text,
                            color: bg,
                            textDecoration: "none",
                            borderRadius: 8,
                            fontSize: "0.9375rem",
                            fontWeight: 500
                        }}
                    >
                        Start a Focus Session →
                    </Link>
                </div>
            </main>
        </div>
    );
}
