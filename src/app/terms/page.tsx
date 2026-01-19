import Link from "next/link";

export default function TermsPage() {
    return (
        <div className="page">
            <div className="content legal fade-in">
                <h1 className="text-center mb-8">Terms</h1>

                <h2>Service</h2>
                <p>LockIn is a focus timer. Free includes 25/50 min sessions.</p>

                <h2>Payments</h2>
                <p>Via Stripe. Cancel anytime. Lifetime non-refundable after 14 days.</p>

                <h2>Use</h2>
                <p>Use the service as intended. Don&apos;t abuse it.</p>

                <h2>Disclaimer</h2>
                <p>Provided as-is. We&apos;re not responsible for outcomes.</p>

                <p className="mt-8 text-center">
                    <Link href="/" className="link">Back</Link>
                </p>
            </div>
        </div>
    );
}
