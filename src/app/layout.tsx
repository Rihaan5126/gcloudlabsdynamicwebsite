import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { profile } from "@/lib/data";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rihaan.dev";
const title = `${profile.name} — ${profile.headline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s — ${profile.name}`,
  },
  description: profile.bio,
  keywords: [
    "Rihaan",
    "portfolio",
    "software engineer",
    "Next.js",
    "React",
    "machine learning",
    "agentic AI",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description: profile.bio,
    siteName: `${profile.name} — Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.bio,
  },
};

// Runs before hydration so the correct theme class is present on <html>
// before first paint — avoids a light/dark flash on load.
const themeInitScript = `
  (function () {
    try {
      var stored = localStorage.getItem("theme");
      var theme = stored === "light" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", theme === "dark");
      document.documentElement.style.colorScheme = theme;
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
