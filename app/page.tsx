import { promises as fs } from "fs";
import path from "path";
import ChangeCard from "@/components/ChangeCard";
import RegionCard from "@/components/RegionCard";
import MapPlaceholder from "@/components/MapPlaceholder";
import FrontlineChart from "@/components/FrontlineChart";
import AdInContent from "@/components/ads/AdInContent";
import AdSidebar from "@/components/ads/AdSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Ukraine Frontline Tracker | Real-Time Conflict Intelligence',
  description: 'Daily frontline changes, territorial control statistics, and comprehensive battle data for the Russia-Ukraine war',
  keywords: 'Ukraine frontline, Russia Ukraine war, frontline map, territorial control, Ukraine conflict, Donbas',
};

type Snapshot = {
  date: string;
  russia_controlled_km2: number;
  ukraine_controlled_km2: number;
  frontline_length_km: number;
  change_7d_km2: number;
  change_30d_km2: number;
  change_notes: string;
};

type Region = {
  id: string; slug: string; name: string; flag_emoji: string;
  status: string; russian_control_pct: number; change_7d: number;
  summary: string; key_locations: string[]; last_updated: string;
};

type FrontlineData = { updated: string; today_summary: string; snapshots: Snapshot[] };

async function getData() {
  const [frontlineRaw, regionsRaw] = await Promise.all([
    fs.readFile(path.join(process.cwd(), "public/data/frontline.json"), "utf-8"),
    fs.readFile(path.join(process.cwd(), "public/data/regions.json"), "utf-8"),
  ]);
  return {
    frontline: JSON.parse(frontlineRaw) as FrontlineData,
    regions: JSON.parse(regionsRaw) as Region[],
  };
}

export default async function Home() {
  const { frontline, regions } = await getData();
  const latest = frontline.snapshots.sort((a, b) => b.date.localeCompare(a.date))[0];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950/30 to-slate-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">🇺🇦 UKRAINE WAR TRACKER</p>
          <h1 className="text-4xl font-extrabold mb-4">
            Ukraine Frontline<br/>
            <span className="text-blue-400">Tracker</span>
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mb-2">
            Daily frontline change summaries with regional breakdowns. Today / 7-day / 30-day shift analysis.
          </p>
          <p className="text-slate-500 text-xs">Updated: {frontline.updated} · Source: ISW, DeepState Map, Ukrainian Armed Forces</p>
        </div>
      </section>

      {/* Alert Banner */}
      <div className="bg-blue-950/40 border-b border-blue-800/30 px-4 py-3">
        <div className="max-w-7xl mx-auto text-sm text-blue-200">
          <span className="font-bold text-blue-400">Today: </span>{frontline.today_summary}
        </div>
      </div>

      {/* Stat Cards - floating overlap */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 -mt-0 relative z-10 my-8">
          <ChangeCard label="7-Day Change" value={-latest.change_7d_km2} unit="km²" note={latest.change_notes} />
          <ChangeCard label="30-Day Change" value={-latest.change_30d_km2} unit="km²" />
          <ChangeCard
            label="Frontline Length"
            value={0}
            unit="km"
            note={`Russian-controlled: ${latest.russia_controlled_km2.toLocaleString()} km²`}
            staticValue={`${latest.frontline_length_km.toLocaleString()} km`}
          />
        </div>

        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            {/* Map */}
            <div className="mb-8">
              <MapPlaceholder />
            </div>

            <AdInContent />

            {/* Chart */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8">
              <h2 className="font-bold text-slate-900 mb-4">Territory Control Over Time</h2>
              <FrontlineChart snapshots={frontline.snapshots} />
            </div>

            {/* Region Grid */}
            <div id="regions" className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Regions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {regions.map((r) => <RegionCard key={r.id} region={r} />)}
              </div>
            </div>
          </div>

          <aside className="hidden lg:block w-[300px] shrink-0">
            <AdSidebar />
            <div className="mt-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-bold text-slate-900 mb-3 text-sm">Status Legend</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-600 ring-1 ring-inset ring-red-500/20">active combat</span>
                  <span className="text-slate-500">Ongoing fighting</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-600 ring-1 ring-inset ring-orange-500/20">contested</span>
                  <span className="text-slate-500">Disputed control</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-500/10 text-green-600 ring-1 ring-inset ring-green-500/20">stable</span>
                  <span className="text-slate-500">Low activity</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <h3 className="font-bold text-slate-900 mb-3 text-sm">Change Color Code</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-red-500 shrink-0"></span>
                    <span className="text-red-600 font-medium">Russia gaining</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-green-500 shrink-0"></span>
                    <span className="text-green-600 font-medium">Ukraine gaining</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-slate-400 shrink-0"></span>
                    <span className="text-slate-500">No change</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-bold text-slate-900 mb-2 text-sm">Data Sources</h3>
              <ul className="text-xs text-slate-500 space-y-1.5">
                <li><a href="https://www.understandingwar.org" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors font-medium">ISW Daily Reports ↗</a></li>
                <li><a href="https://deepstatemap.live" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors font-medium">DeepState Map ↗</a></li>
                <li className="text-slate-400">Ukrainian Armed Forces GS</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
