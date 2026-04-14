import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import FrontlineChart from "@/components/FrontlineChart";
import type { Metadata } from "next";
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'

type Region = {
  id: string; slug: string; name: string; flag_emoji: string;
  status: string; russian_control_pct: number; change_7d: number;
  summary: string; key_locations: string[]; last_updated: string;
};

type Snapshot = {
  date: string; russia_controlled_km2: number; ukraine_controlled_km2: number;
  frontline_length_km: number; change_7d_km2: number; change_30d_km2: number; change_notes: string;
};

async function getData() {
  const [regionsRaw, frontlineRaw] = await Promise.all([
    fs.readFile(path.join(process.cwd(), "public/data/regions.json"), "utf-8"),
    fs.readFile(path.join(process.cwd(), "public/data/frontline.json"), "utf-8"),
  ]);
  return { regions: JSON.parse(regionsRaw) as Region[], snapshots: JSON.parse(frontlineRaw).snapshots as Snapshot[] };
}

export async function generateStaticParams() {
  const regions = JSON.parse(await fs.readFile(path.join(process.cwd(), "public/data/regions.json"), "utf-8")) as Region[];
  return routing.locales.flatMap(locale => regions.map((r) => ({ locale, slug: r.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const regions = JSON.parse(await fs.readFile(path.join(process.cwd(), "public/data/regions.json"), "utf-8")) as Region[];
  const region = regions.find((r) => r.slug === slug);
  if (!region) return {};
  return {
    title: `${region.name} — Ukraine Frontline Tracker`,
    description: region.summary,
  };
}

const STATUS_STYLES: Record<string, string> = {
  "active-combat": "bg-red-500/10 text-red-600 ring-1 ring-inset ring-red-500/20",
  "contested": "bg-orange-500/10 text-orange-600 ring-1 ring-inset ring-orange-500/20",
  "relatively-stable": "bg-green-500/10 text-green-600 ring-1 ring-inset ring-green-500/20",
};

export default async function RegionPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale)

  const { regions, snapshots } = await getData();
  const region = regions.find((r) => r.slug === slug);
  if (!region) notFound();

  const ukraineControlPct = 100 - region.russian_control_pct;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href={`/${locale}`} className="text-sm text-slate-500 hover:text-blue-600 transition-colors mb-6 inline-flex items-center gap-1">
        ← Dashboard
      </Link>

      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-2">🇺🇦 REGION ANALYSIS</p>
          <h1 className="text-3xl font-extrabold text-slate-900">
            {region.flag_emoji && <span className="mr-2">{region.flag_emoji}</span>}
            {region.name}
          </h1>
          <p className="text-slate-400 text-sm mt-1">Last updated: {region.last_updated}</p>
        </div>
        <span className={`px-3 py-1.5 rounded-full text-sm font-semibold shrink-0 ${STATUS_STYLES[region.status] || "bg-slate-500/10 text-slate-600 ring-1 ring-inset ring-slate-500/20"}`}>
          {region.status.replace(/-/g, " ")}
        </span>
      </div>

      {/* Control breakdown */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
        <div className="flex justify-between text-sm font-semibold mb-3">
          <span className="text-red-600">Russia {region.russian_control_pct}%</span>
          <span className={region.change_7d > 0 ? "text-red-500 text-xs" : region.change_7d < 0 ? "text-green-600 text-xs" : "text-slate-400 text-xs"}>
            7d: {region.change_7d > 0 ? "+" : ""}{region.change_7d}%
          </span>
          <span className="text-blue-600">Ukraine {ukraineControlPct}%</span>
        </div>
        <div className="h-4 bg-blue-200 rounded-full overflow-hidden">
          <div className="h-4 bg-gradient-to-r from-red-500 to-red-600 rounded-l-full transition-all" style={{ width: `${region.russian_control_pct}%` }} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
        <p className="text-slate-700 leading-relaxed">{region.summary}</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
        <h2 className="font-bold text-slate-900 mb-3">Key Locations</h2>
        <div className="flex flex-wrap gap-2">
          {region.key_locations.map((loc) => (
            <span key={loc} className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg text-sm text-slate-700 font-medium">
              {loc}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="font-bold text-slate-900 mb-4">Overall Frontline Trend</h2>
        <FrontlineChart snapshots={snapshots} />
        <p className="text-xs text-slate-400 mt-2">Chart shows total Ukraine-wide control figures from ISW data</p>
      </div>
    </div>
  );
}
