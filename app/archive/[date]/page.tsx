import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import ChangeCard from "@/components/ChangeCard";
import type { Metadata } from "next";

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
  return snapshots.map((s) => ({ date: s.date }));
}

export async function generateMetadata(props: PageProps<"/archive/[date]">): Promise<Metadata> {
  const { date } = await props.params;
  return {
    title: `Ukraine Frontline ${date} — Historical Snapshot`,
    description: `Ukraine frontline data snapshot for ${date}.`,
  };
}

export default async function ArchivePage(props: PageProps<"/archive/[date]">) {
  const { date } = await props.params;
  const snapshots = await getSnapshots();
  const snapshot = snapshots.find((s) => s.date === date);
  if (!snapshot) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-gray-400 hover:text-white mb-6 inline-block">← Dashboard</Link>
      <h1 className="text-3xl font-bold text-white mb-2">Archive: {snapshot.date}</h1>
      <p className="text-gray-400 mb-6">{snapshot.change_notes}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <ChangeCard label="7-Day Change" value={-snapshot.change_7d_km2} unit="km²" />
        <ChangeCard label="30-Day Change" value={-snapshot.change_30d_km2} unit="km²" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 border border-red-800 rounded-lg p-4 text-center">
          <div className="text-xs text-red-400 mb-1">Russia controlled</div>
          <div className="text-2xl font-bold text-red-300">{snapshot.russia_controlled_km2.toLocaleString()} km²</div>
        </div>
        <div className="bg-gray-900 border border-blue-800 rounded-lg p-4 text-center">
          <div className="text-xs text-blue-400 mb-1">Ukraine controlled</div>
          <div className="text-2xl font-bold text-blue-300">{snapshot.ukraine_controlled_km2.toLocaleString()} km²</div>
        </div>
      </div>
    </div>
  );
}
