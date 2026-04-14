import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import AdHeader from "@/components/ads/AdHeader";
import AdMobileSticky from "@/components/ads/AdMobileSticky";
import VisitorCounter from "@/components/VisitorCounter";
import Link from "next/link";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ukraine Frontline Tracker — Live War Map Update 2026",
  description: "Daily Ukraine frontline updates, territorial changes, and region-by-region analysis. Source: ISW.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-100">
        <AdHeader />
        <header className="border-b border-gray-800 px-4 py-3 flex items-center justify-between flex-wrap gap-2">
          <Link href="/" className="text-lg font-bold text-white hover:text-yellow-400 transition-colors">
            Ukraine Frontline Tracker
          </Link>
          <nav className="flex gap-4 text-sm text-gray-400">
            <Link href="/" className="hover:text-white">Dashboard</Link>
            <Link href="/about" className="hover:text-white">About</Link>
          </nav>
          <VisitorCounter />
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-800 px-4 py-4 text-center text-xs text-gray-500">
          Ukraine Frontline Tracker © 2026 · Source: ISW, DeepState Map, Ukrainian MoD
        </footer>
        <AdMobileSticky />
      </body>
    </html>
  );
}
