import type { Metadata } from "next";
export const metadata: Metadata = { title: "About — Ukraine Frontline Tracker", description: "About data sources and methodology." };
export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-4">About Ukraine Frontline Tracker</h1>
      <div className="space-y-4 text-gray-300">
        <p>This tracker provides daily summaries of frontline changes in the Russia-Ukraine war, based on open-source data.</p>
        <h2 className="text-lg font-semibold text-white mt-6">Primary Sources</h2>
        <ul className="list-disc pl-6 space-y-2 text-sm">
          <li><strong className="text-white">Institute for the Study of War (ISW)</strong> — Daily conflict updates and map assessments</li>
          <li><strong className="text-white">DeepState Map</strong> — Ukrainian volunteer-maintained frontline tracking</li>
          <li><strong className="text-white">Ukrainian Armed Forces</strong> — Official military communiques</li>
        </ul>
        <p className="text-gray-400 text-sm">No graphic imagery used. Change direction: red = Russia gaining; green = Ukraine gaining.</p>
      </div>
    </div>
  );
}
