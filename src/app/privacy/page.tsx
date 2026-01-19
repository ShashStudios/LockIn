import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="page">
            <div className="content legal fade-in">
                <h1 className="text-center mb-8">Privacy</h1>

                <h2>Local storage</h2>
                <p>Sessions stay on your device. We don&apos;t track your focus.</p>

                <h2>Authentication</h2>
                <p>Sign-in is handled by Clerk. We only receive basic profile info.</p>

                <h2>Payments</h2>
                <p>Stripe processes payments. We never see your card.</p>

                <h2>Tracking</h2>
                <p>None. No analytics. No cookies.</p>

                <p className="mt-8 text-center">
                    <Link href="/" className="link">Back</Link>
                </p>
            </div>
        </div>
    );
}
