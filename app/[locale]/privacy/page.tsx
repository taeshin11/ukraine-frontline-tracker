import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Ukraine Frontline Tracker Privacy Policy — how we collect, use, and protect your information.',
  keywords: 'privacy policy, data protection, cookies, GDPR',
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const sections = [
    { title: '1. Introduction', content: 'Ukraine Frontline Tracker operates the website at ukraine-frontline-tracker.vercel.app. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.' },
    { title: '2. Information We Collect', content: 'We automatically collect browser type, OS, referring URLs, device info, and pages visited. We do not require registration or intentionally collect personally identifiable information.' },
    { title: '3. Cookies and Tracking', content: 'We use cookies for: site functionality (Essential), anonymized traffic analysis (Google Analytics), personalized advertising (Google AdSense), and language preferences. Control via browser settings.' },
    { title: '4. Google AdSense & Advertising', content: 'Google AdSense uses cookies to serve ads based on your browsing history. Opt out: https://www.google.com/settings/ads or http://www.aboutads.info/choices. Details: https://policies.google.com/technologies/partner-sites.' },
    { title: '5. Google Analytics', content: 'Google Analytics collects anonymized usage data. We do not combine this with personally identifiable information.' },
    { title: '6. Third-Party Links', content: 'We link to third-party sites but are not responsible for their privacy practices.' },
    { title: '7. Data Retention', content: 'Analytics data is auto-deleted after 26 months. We implement reasonable security measures.' },
    { title: "8. Children's Privacy", content: 'Not directed to individuals under 13. We do not knowingly collect data from children.' },
    { title: '9. Policy Changes', content: 'We may update this policy and will post changes with an updated date.' },
    { title: '10. Contact', content: 'Questions? Contact us at contact@ukraine-frontline-tracker.vercel.app.' },
  ]
  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-slate-500 mb-8">
          <Link href={`/${locale}`} className="hover:text-slate-700">Home</Link>
          <span className="mx-2">/</span>
          <span>Privacy Policy</span>
        </nav>
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Privacy Policy</h1>
        <p className="text-slate-500 mb-10">Last updated: April 2025</p>
        <div className="space-y-4">
          {sections.map(({ title, content }) => (
            <section key={title} className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-3">{title}</h2>
              <p className="text-slate-600 leading-relaxed text-sm">{content}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
