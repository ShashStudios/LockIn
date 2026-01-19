"use client";

import { useRouter } from "next/navigation";

export default function AccountPage() {
    const router = useRouter();

    return (
        <div className="page">
            <div className="content text-center fade-in">
                <h1 className="mb-2">Account</h1>
                <p className="mb-8">You&apos;re on the Free plan.</p>

                <button onClick={() => router.push("/pricing")} className="btn">
                    View upgrade options
                </button>

                <p className="mt-12 small muted">
                    Sign in to sync across devices.<br />
                    Requires Clerk configuration.
                </p>

                <p className="mt-8">
                    <button onClick={() => router.push("/")} className="btn-light">
                        Back
                    </button>
                </p>
            </div>
        </div>
    );
}
