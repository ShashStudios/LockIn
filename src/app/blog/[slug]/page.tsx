"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getArticleBySlug } from "@/lib/articles";
import { getPreferences } from "@/lib/storage";

export default function ArticlePage() {
    const params = useParams();
    const router = useRouter();
    const [darkMode, setDarkMode] = useState(false);

    // Safety check for slug
    const slug = typeof params?.slug === 'string' ? params.slug : '';
    const article = getArticleBySlug(slug);

    useEffect(() => {
        const prefs = getPreferences();
        setDarkMode(prefs.darkMode || false);
    }, []);

    const bg = darkMode ? "#000" : "#FFF";
    const text = darkMode ? "#FFF" : "#000";
    const textMuted = darkMode ? "#AAA" : "#555";
    const textSecondary = darkMode ? "#888" : "#666";
    const border = darkMode ? "#222" : "#EEE";

    if (!article) {
        return (
            <div style={{
                minHeight: '100vh',
                background: bg,
                color: text,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <h1>Article not found</h1>
                <Link href="/blog" style={{ color: textSecondary, marginTop: 16 }}>Return to Blog</Link>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: bg }}>
            {/* Header */}
            <header style={{
                padding: '24px 32px',
                maxWidth: 680,
                margin: '0 auto'
            }}>
                <Link
                    href="/blog"
                    style={{
                        background: 'none',
                        border: 'none',
                        color: textSecondary,
                        fontSize: '0.9375rem',
                        cursor: 'pointer',
                        padding: 0,
                        textDecoration: 'none'
                    }}
                >
                    ← Back
                </Link>
            </header>

            {/* Article Header */}
            <div style={{
                maxWidth: 680,
                margin: '0 auto',
                padding: '40px 24px 0',
                textAlign: 'center'
            }}>
                <p style={{
                    color: textSecondary,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    marginBottom: 20
                }}>
                    {article.date} · {article.readTime}
                </p>

                <h1 style={{
                    color: text,
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    fontWeight: 500,
                    lineHeight: 1.25,
                    margin: '0 auto 20px',
                    letterSpacing: '-0.02em'
                }}>
                    {article.title}
                </h1>

                <p style={{
                    color: textSecondary,
                    fontSize: '1.0625rem',
                    maxWidth: 550,
                    margin: '0 auto 60px',
                    lineHeight: 1.5
                }}>
                    {article.subtitle}
                </p>
            </div>

            {/* Article Content */}
            <article style={{
                maxWidth: 680,
                margin: '0 auto',
                padding: '0 24px 100px'
            }}>
                {article.sections.map((section, index) => (
                    <div key={index} style={{ marginBottom: 48 }}>
                        {section.heading && (
                            <h2 style={{
                                fontSize: '1.375rem',
                                fontWeight: 500,
                                color: text,
                                marginBottom: 16,
                                marginTop: index === 0 ? 0 : 48,
                                letterSpacing: '-0.01em'
                            }}>
                                {section.heading}
                            </h2>
                        )}
                        {section.content.split('\n\n').map((paragraph, pIndex) => (
                            <p key={pIndex} style={{
                                color: textMuted,
                                fontSize: '1.0625rem',
                                lineHeight: 1.8,
                                marginBottom: 20
                            }}>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                ))}

                <div style={{
                    marginTop: 80,
                    paddingTop: 40,
                    borderTop: `1px solid ${border}`,
                    textAlign: 'center'
                }}>
                    <p style={{ color: textSecondary, marginBottom: 20, fontSize: '0.9375rem' }}>
                        Ready to put these ideas into practice?
                    </p>
                    <Link href="/" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '14px 32px',
                        background: text,
                        color: bg,
                        textDecoration: 'none',
                        borderRadius: 8,
                        fontSize: '0.9375rem',
                        fontWeight: 500
                    }}>
                        Start a Focus Session →
                    </Link>
                </div>
            </article>
        </div>
    );
}
