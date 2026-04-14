import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Ukraine Frontline Tracker",
              "url": "https://ukraine-frontline-tracker.vercel.app",
              "description": "Daily frontline changes, territorial control statistics, and battle data for the Russia-Ukraine war",
              "publisher": { "@type": "Organization", "name": "Ukraine Frontline Tracker", "url": "https://ukraine-frontline-tracker.vercel.app" }
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
