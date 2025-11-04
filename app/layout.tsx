import localFont from "next/font/local";
import "../public/css/global.css";

const tasaOrbiter = localFont({
    src: [
        {
            path: "../public/fonts/TASAOrbiter-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/TASAOrbiter-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/fonts/TASAOrbiter-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../public/fonts/TASAOrbiter-Bold.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../public/fonts/TASAOrbiter-ExtraBold.ttf",
            weight: "800",
            style: "normal",
        },
    ],
    variable: "--font-tasa-orbiter",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className="h-full" lang="en">
            <body
                className={`${tasaOrbiter.variable} antialiased w-full h-full`}
            >
                {children}
            </body>
        </html>
    );
}
