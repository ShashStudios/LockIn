import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata = {
    title: "LockIn - Force Deep Focus",
    description: "A simple timer that helps you stay focused.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>{children}</body>
            </html>
        </ClerkProvider>
    );
}
