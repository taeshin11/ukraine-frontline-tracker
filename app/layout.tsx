import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import AdHeader from "@/components/ads/AdHeader";
import AdMobileSticky from "@/components/ads/AdMobileSticky";
import VisitorCounter from "@/components/VisitorCounter";
import Link from "next/link";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'Ukraine Frontline Tracker | Real-Time Intelligence',
    template: '%s | Ukraine Frontline Tracker'
  },
  description: 'Daily frontline changes, territorial control statistics, and comprehensive battle data for the Russia-Ukraine war',
  keywords: 'Ukraine frontline, Russia Ukraine war, frontline map, territorial control, Ukraine conflict, Donbas',
  openGraph: {
    type: 'website',
    siteName: 'Ukraine Frontline Tracker',
    title: 'Ukraine Frontline Tracker | Real-Time Intelligence',
    description: 'Daily frontline changes, territorial control statistics, and comprehensive battle data for the Russia-Ukraine war',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ukraine Frontline Tracker',
    description: 'Daily frontline changes, territorial control statistics, and comprehensive battle data for the Russia-Ukraine war',
  },
  verification: {
    google: 'add-your-google-site-verification-here',
  },
  other: {
    'google-adsense-account': 'ca-pub-add-your-publisher-id-here',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <AdHeader />
        <header className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inset-0 rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative rounded-full h-2.5 w-2.5 bg-blue-400"></span>
              </span>
              <Link href="/" className="text-lg font-bold hover:text-blue-400 transition-colors">
                Ukraine Frontline Tracker
              </Link>
            </div>
            <nav className="flex gap-1 items-center">
              <Link href="/" className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg text-sm transition-all">Home</Link>
              <Link href="/#regions" className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg text-sm transition-all">Regions</Link>
              <Link href="/#archive" className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg text-sm transition-all">Archive</Link>
              <Link href="/about" className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg text-sm transition-all">About</Link>
              <VisitorCounter />
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 py-6 text-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-slate-700 pt-6 mb-4 mt-4">
              <a href="/about" className="hover:text-white transition-colors">About Us</a>
              <a href="/faq" className="hover:text-white transition-colors">How to Use &amp; FAQ</a>
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <span>Ukraine Frontline Tracker © 2026</span>
              <span className="text-slate-500">Source: ISW · DeepState Map · Ukrainian MoD</span>
            </div>
          </div>
        </footer>
        <AdMobileSticky />
      </body>
    </html>
  );
}
