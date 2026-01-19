"use client";

import { useRouter } from "next/navigation";

export default function PricingPage() {
    const router = useRouter();

    return (
        <div className="page">
            <div className="content fade-in">
                <h1 className="text-center mb-8">Pricing</h1>

                <div className="mb-6">
                    <p className="small mb-2">Free</p>
                    <p>25 and 50 minute sessions. Brown noise. Quit friction.</p>
                </div>

                <div className="mb-6">
                    <p className="small mb-2">Pro · $4/month</p>
                    <p>90 minute sessions. Volume control. Stronger friction.</p>
                </div>

                <div className="mb-8">
                    <p className="small mb-2">Lifetime · $15</p>
                    <p>All Pro features forever.</p>
                </div>

                <p className="text-center">
                    <button onClick={() => router.push("/")} className="btn-light">
                        Back
                    </button>
                </p>
            </div>
        </div>
    );
}
