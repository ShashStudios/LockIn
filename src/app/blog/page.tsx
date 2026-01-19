"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { articles, getAllCategories } from "@/lib/articles";
import { getPreferences } from "@/lib/storage";

export default function BlogPage() {
    const router = useRouter();
    const [darkMode, setDarkMode] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Get unique categories from articles
    const categories = ["All", ...getAllCategories()]; // Ensure "All" is first
    useEffect(() => {
        const prefs = getPreferences();
        setDarkMode(prefs.darkMode || false);
    }, []);

    const bg = darkMode ? "#000" : "#FFF";
    const text = darkMode ? "#FFF" : "#000";
    const textMuted = darkMode ? "#AAA" : "#555";
    const textSecondary = darkMode ? "#888" : "#666";
    const border = darkMode ? "#222" : "#EEE";

    const filteredArticles = selectedCategory === "All"
        ? articles
        : articles.filter(a => a.category === selectedCategory);

    // Article List View
    return (
        <div style={{
            minHeight: '100vh',
            background: bg,
            transition: 'background 0.3s ease'
        }}>
            {/* Header */}
            <header style={{
                padding: '24px 32px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: 1000,
                margin: '0 auto'
            }}>
                <Link
                    href="/"
                    style={{
                        color: text,
                        textDecoration: 'none',
                        fontSize: '0.9375rem',
                        fontWeight: 500
                    }}
                >
                    ← LockIn
                </Link>
            </header>

            <main style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 100px' }}>
                <h1 style={{
                    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                    fontWeight: 500,
                    color: text,
                    marginBottom: 8,
                    letterSpacing: '-0.02em'
                }}>
                    Articles
                </h1>
                <p style={{
                    color: textSecondary,
                    fontSize: '1rem',
                    marginBottom: 40
                }}>
                    Essays on focus, productivity, and deep work
                </p>

                {/* Category Filter */}
                <div style={{
                    display: 'flex',
                    gap: 6,
                    flexWrap: 'wrap',
                    marginBottom: 48
                }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                padding: '6px 14px',
                                background: selectedCategory === cat ? text : 'transparent',
                                color: selectedCategory === cat ? bg : textSecondary,
                                border: 'none',
                                borderRadius: 100,
                                fontSize: '0.8125rem',
                                cursor: 'pointer',
                                transition: 'all 0.15s'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Articles Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {filteredArticles.map((article) => (
                        <Link
                            key={article.id}
                            href={`/blog/${article.slug}`}
                            style={{
                                padding: '28px 0',
                                borderBottom: `1px solid ${border}`,
                                cursor: 'pointer',
                                transition: 'opacity 0.2s',
                                textDecoration: 'none',
                                display: 'block'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ flex: 1 }}>
                                    <span style={{
                                        fontSize: '0.6875rem',
                                        color: textSecondary,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.08em',
                                        display: 'block',
                                        marginBottom: 8
                                    }}>
                                        {article.category} · {article.readTime}
                                    </span>
                                    <h2 style={{
                                        fontSize: '1.25rem',
                                        fontWeight: 500,
                                        color: text,
                                        margin: 0,
                                        marginBottom: 6,
                                        lineHeight: 1.3
                                    }}>
                                        {article.title}
                                    </h2>
                                    <p style={{
                                        fontSize: '0.9375rem',
                                        color: textSecondary,
                                        margin: 0,
                                        lineHeight: 1.5
                                    }}>
                                        {article.subtitle}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
