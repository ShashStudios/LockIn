"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { formatDuration } from "@/lib/utils";
import { getHistory } from "@/lib/storage";

export default function CompletePage() {
    const router = useRouter();
    const [ready, setReady] = useState(false);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        setReady(true);
        const h = getHistory();
        if (h.length > 0 && h[0].completed) {
            setDuration(h[0].duration);
        }
    }, []);

    if (!ready) {
        return <div className="page"><div className="spinner" /></div>;
    }

    return (
        <div className="page">
            <div className="content text-center fade-in">
                <svg className="check" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" className="check-circle" />
                    <path d="M30 50 L45 65 L70 35" className="check-mark" />
                </svg>

                <h1 className="mb-3">Done</h1>
                {duration > 0 && (
                    <p>{formatDuration(duration)} completed</p>
                )}

                <div className="mt-10">
                    <button onClick={() => router.push("/")} className="btn">
                        Start another
                    </button>
                </div>

                <p className="mt-8">
                    <button onClick={() => router.push("/")} className="btn-text">
                        I&apos;m done for now
                    </button>
                </p>
            </div>
        </div>
    );
}
