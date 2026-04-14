import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import FrontlineChart from "@/components/FrontlineChart";
import type { Metadata } from "next";

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
  return regions.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata(props: PageProps<"/region/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const regions = JSON.parse(await fs.readFile(path.join(process.cwd(), "public/data/regions.json"), "utf-8")) as Region[];
  const region = regions.find((r) => r.slug === slug);
  if (!region) return {};
  return {
    title: `${region.name} — Ukraine Frontline Tracker`,
    description: region.summary,
  };
}

const STATUS_STYLES: Record<string, string> = {
  "active-combat": "bg-red-900 text-red-300",
  "contested": "bg-orange-900 text-orange-300",
  "relatively-stable": "bg-green-900 text-green-300",
};

export default async function RegionPage(props: PageProps<"/region/[slug]">) {
  const { slug } = await props.params;
  const { regions, snapshots } = await getData();
  const region = regions.find((r) => r.slug === slug);
  if (!region) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-gray-400 hover:text-white mb-6 inline-block">← Dashboard</Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">{region.name}</h1>
          <p className="text-gray-400 text-sm mt-1">Updated: {region.last_updated}</p>
        </div>
        <span className={`text-sm px-3 py-1 rounded-full ${STATUS_STYLES[region.status] || "bg-gray-700 text-gray-300"}`}>
          {region.status.replace(/-/g, " ")}
        </span>
      </div>

      {/* Control bar */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Russian control: {region.russian_control_pct}%</span>
          <span className={region.change_7d > 0 ? "text-red-400" : region.change_7d < 0 ? "text-green-400" : "text-gray-400"}>
            7d: {region.change_7d > 0 ? "+" : ""}{region.change_7d}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div className="bg-red-600 h-4 rounded-l-full" style={{ width: `${region.russian_control_pct}%` }} />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span className="text-red-400">Russia {region.russian_control_pct}%</span>
          <span className="text-blue-400">Ukraine {100 - region.russian_control_pct}%</span>
        </div>
      </div>

      <p className="text-gray-300 mb-6 leading-relaxed">{region.summary}</p>

      <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6">
        <h2 className="font-semibold text-white mb-3">Key Locations</h2>
        <div className="flex flex-wrap gap-2">
          {region.key_locations.map((loc) => (
            <span key={loc} className="bg-gray-800 border border-gray-700 px-3 py-1 rounded text-sm text-gray-300">{loc}</span>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
        <h2 className="font-semibold text-white mb-4">Overall Frontline Trend</h2>
        <FrontlineChart snapshots={snapshots} />
        <p className="text-xs text-gray-500 mt-2">Chart shows total Ukraine-wide control figures from ISW data</p>
      </div>
    </div>
  );
}
