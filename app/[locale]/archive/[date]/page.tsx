import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import ChangeCard from "@/components/ChangeCard";
import type { Metadata } from "next";
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'

type Snapshot = {
  date: string; russia_controlled_km2: number; ukraine_controlled_km2: number;
  frontline_length_km: number; change_7d_km2: number; change_30d_km2: number; change_notes: string;
};

async function getSnapshots(): Promise<Snapshot[]> {
  const raw = await fs.readFile(path.join(process.cwd(), "public/data/frontline.json"), "utf-8");
  return JSON.parse(raw).snapshots;
}

export async function generateStaticParams() {
  const snapshots = await getSnapshots();
  return routing.locales.flatMap(locale => snapshots.map((s) => ({ locale, date: s.date })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; date: string }> }): Promise<Metadata> {
  const { date } = await params;
  return {
    title: `Ukraine Frontline ${date} — Historical Snapshot`,
    description: `Ukraine frontline data snapshot for ${date}.`,
  };
}

export default async function ArchivePage({ params }: { params: Promise<{ locale: string; date: string }> }) {
  const { locale, date } = await params;
  setRequestLocale(locale)

  const snapshots = await getSnapshots();
  const snapshot = snapshots.find((s) => s.date === date);
  if (!snapshot) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href={`/${locale}`} className="text-sm text-slate-500 hover:text-blue-600 transition-colors mb-6 inline-flex items-center gap-1">
        ← Dashboard
      </Link>

      <div className="mb-8">
        <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-2">🇺🇦 ARCHIVE SNAPSHOT</p>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Frontline: {snapshot.date}</h1>
        {snapshot.change_notes && (
          <p className="text-slate-600 mt-2 leading-relaxed">{snapshot.change_notes}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <ChangeCard label="7-Day Change" value={-snapshot.change_7d_km2} unit="km²" />
        <ChangeCard label="30-Day Change" value={-snapshot.change_30d_km2} unit="km²" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center">
          <div className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">Russia controlled</div>
          <div className="text-3xl font-black text-red-600">{snapshot.russia_controlled_km2.toLocaleString()}</div>
          <div className="text-xs text-slate-400 mt-1">km²</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center">
          <div className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2">Ukraine controlled</div>
          <div className="text-3xl font-black text-blue-600">{snapshot.ukraine_controlled_km2.toLocaleString()}</div>
          <div className="text-xs text-slate-400 mt-1">km²</div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Frontline Length</div>
        <div className="text-3xl font-black text-slate-900">{snapshot.frontline_length_km.toLocaleString()} km</div>
      </div>
    </div>
  );
}
