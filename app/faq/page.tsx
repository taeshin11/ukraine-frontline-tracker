import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Use & FAQ',
  description: 'How to use Ukraine Frontline Tracker. FAQ about our data, methodology, and features.',
  keywords: 'Ukraine frontline, Russia Ukraine war, frontline map, territorial control, Ukraine conflict, Donbas, FAQ, guide',
}

export default function FaqPage() {
  const faqs = [
    { q: 'What is Ukraine Frontline Tracker and who is it for?', a: 'Ukraine Frontline Tracker is a free, publicly accessible platform that provides daily frontline changes, territorial control statistics, and comprehensive battle data for the Russia-Ukraine war. Designed for journalists, researchers, policy analysts, students, and NGO workers. No registration or payment required.' },
    { q: 'Where does data come from?', a: 'Data is sourced from ACLED, SIPRI, Uppsala Conflict Data Program, UN agencies, official government sources, and verified OSINT. Primary sources are cited where available.' },
    { q: 'How often is data updated?', a: 'Breaking events are updated within 24-48 hours. Statistical summaries are reviewed weekly or monthly. Each section shows its last-updated timestamp.' },
    { q: 'Is this platform free?', a: 'Ukraine Frontline Tracker is entirely free with no registration required. The platform is sustained through advertising. No paywalls or premium tiers.' },
    { q: 'Can I use or cite this data?', a: 'Yes, with attribution to the platform and original primary source. For academic publications, cross-reference against primary sources. For bulk access, contact us at contact@ukraine-frontline-tracker.vercel.app.' }
  ]
  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-700">Home</Link>
          <span className="mx-2">/</span>
          <span>How to Use &amp; FAQ</span>
        </nav>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">How to Use Ukraine Frontline Tracker</h1>
        <p className="text-xl text-slate-600 mb-10">Get the most from our conflict intelligence platform.</p>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Getting Started in 3 Steps</h2>
          <div className="grid gap-4">
            {[
              { step: '1', title: 'Explore the Dashboard', desc: 'Start on the homepage for a high-level overview. Key metrics, recent events, and interactive visualizations update regularly.' },
              { step: '2', title: 'Filter & Drill Down', desc: 'Use filter controls to narrow data by region, date, type, or severity. Click any event or data point for detailed information.' },
              { step: '3', title: 'Track Changes Over Time', desc: 'Use timeline and historical views to understand trends. Bookmark pages to stay current on developments.' }
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl border border-slate-100 p-5 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg shrink-0">{step}</div>
                <div><h3 className="font-semibold text-slate-800 mb-1">{title}</h3><p className="text-slate-600 text-sm">{desc}</p></div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6">
                <h3 className="font-semibold text-slate-800 mb-3">{q}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
