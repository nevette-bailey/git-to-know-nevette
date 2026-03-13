import type {Metadata} from "next";
import {Cormorant_Garamond, DM_Sans} from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav"

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    style: ["normal", "italic"],
    variable: "--font-cormorant",
    display: "swap",
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500"],
    variable: "--font-dm-sans",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Nevette A. Bailey, Ph.D. — Software Engineer & Technical Leader",
    description:
        "Senior software engineer and fractional technology leader with deep experience in monetization systems, engineering org design, and ethical ML. Based in Brooklyn, NY.",
    icons: {
        icon: [{url: "/logo/logo-mark.svg", type: "image/svg+xml"}],
        apple: "/logo/logo-mark.svg",
    },
    metadataBase: new URL("https://nevettebailey.com"),
    openGraph: {
        title: "Nevette A. Bailey, Ph.D.",
        description: "Software Engineer & Technical Leader",
        url: "https://nevettebailey.com",
        siteName: "Nevette A. Bailey",
        locale: "en_US",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
    twitter: {
        card: "summary_large_image",
        title: "Nevette A. Bailey, Ph.D.",
        description: "Software Engineer & Technical Leader",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
        <body>
        <Nav/>
        {children}
        </body>
        </html>
    );
}
