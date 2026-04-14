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
  title: "Ukraine Frontline Tracker — Today's War Map Update April 2026",
  description: "Ukraine frontline map today. Daily territorial change data, region analysis, ISW sourced. Ukraine war update.",
  keywords: "ukraine frontline, ukraine war map today, ukraine frontline change, russia ukraine war update",
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Ukraine Frontline Tracker</h1>
        <p className="text-gray-400 text-sm">
          Updated: {frontline.updated} · Source: ISW, DeepState Map, Ukrainian Armed Forces
        </p>
        <div className="mt-3 bg-yellow-950 border border-yellow-800 rounded-lg p-3 text-sm text-yellow-300">
          Today: {frontline.today_summary}
        </div>
      </div>

      <div className="flex gap-8">
        <div className="flex-1 min-w-0">
          {/* Change Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <ChangeCard
              label="7-Day Change (Russia net gain)"
              value={-latest.change_7d_km2}
              unit="km²"
              note={latest.change_notes}
            />
            <ChangeCard
              label="30-Day Change (Russia net gain)"
              value={-latest.change_30d_km2}
              unit="km²"
            />
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <div className="text-xs text-gray-400 mb-1">Frontline Length</div>
              <div className="text-2xl font-bold text-white">{latest.frontline_length_km.toLocaleString()} km</div>
              <div className="text-xs text-gray-500 mt-1">Russian-controlled: {latest.russia_controlled_km2.toLocaleString()} km²</div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mb-8">
            <MapPlaceholder />
          </div>

          <AdInContent />

          {/* Chart */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-8">
            <h2 className="font-semibold text-white mb-4">Territory Control Over Time</h2>
            <FrontlineChart snapshots={frontline.snapshots} />
          </div>

          {/* Region Grid */}
          <h2 className="text-xl font-semibold text-white mb-4">Regions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regions.map((r) => <RegionCard key={r.id} region={r} />)}
          </div>
        </div>

        <aside className="hidden lg:block w-[300px] shrink-0">
          <AdSidebar />
          <div className="mt-6 bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-3 text-sm">Status Legend</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="bg-red-900 text-red-300 px-2 py-0.5 rounded-full text-xs">active-combat</span>
                <span className="text-gray-400">Ongoing fighting</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-orange-900 text-orange-300 px-2 py-0.5 rounded-full text-xs">contested</span>
                <span className="text-gray-400">Disputed control</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-900 text-green-300 px-2 py-0.5 rounded-full text-xs">relatively-stable</span>
                <span className="text-gray-400">Low activity</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <h3 className="font-semibold text-white mb-3 text-sm">Change Color Code</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-red-600 shrink-0"></span>
                  <span className="text-red-400">Russia gaining</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-green-600 shrink-0"></span>
                  <span className="text-green-400">Ukraine gaining</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-gray-600 shrink-0"></span>
                  <span className="text-gray-400">No change</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2 text-sm">Data Sources</h3>
            <ul className="text-xs text-gray-400 space-y-1">
              <li><a href="https://www.understandingwar.org" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">ISW Daily Reports</a></li>
              <li><a href="https://deepstatemap.live" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">DeepState Map</a></li>
              <li>Ukrainian Armed Forces GS</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
