import Link from "next/link";

type Region = {
  id: string;
  slug: string;
  name: string;
  flag_emoji: string;
  status: string;
  russian_control_pct: number;
  change_7d: number;
  summary: string;
  key_locations: string[];
  last_updated: string;
};

const STATUS_STYLES: Record<string, string> = {
  "active-combat": "bg-red-500/10 text-red-600 ring-1 ring-inset ring-red-500/20",
  "contested": "bg-orange-500/10 text-orange-600 ring-1 ring-inset ring-orange-500/20",
  "relatively-stable": "bg-green-500/10 text-green-600 ring-1 ring-inset ring-green-500/20",
};

export default function RegionCard({ region, locale = 'en' }: { region: Region; locale?: string }) {
  return (
    <Link href={`/${locale}/region/${region.slug}`} className="block group">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {region.flag_emoji && <span className="mr-1.5">{region.flag_emoji}</span>}
            {region.name}
          </h3>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLES[region.status] || "bg-slate-500/10 text-slate-600 ring-1 ring-inset ring-slate-500/20"}`}>
            {region.status.replace(/-/g, " ")}
          </span>
        </div>

        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Russian control</span>
            <span className="font-bold text-slate-800">{region.russian_control_pct}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full">
            <div
              className="h-2 bg-gradient-to-r from-red-400 to-red-500 rounded-full transition-all"
              style={{ width: `${region.russian_control_pct}%` }}
            />
          </div>
        </div>

        <p className="text-slate-600 text-sm line-clamp-2 mb-3">{region.summary}</p>

        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="truncate max-w-[60%]">{region.key_locations?.slice(0, 3).join(", ")}</span>
          <span className={`font-semibold ml-2 ${region.change_7d > 0 ? "text-red-600" : region.change_7d < 0 ? "text-green-600" : "text-slate-500"}`}>
            {region.change_7d > 0 ? `−${region.change_7d}` : `+${Math.abs(region.change_7d || 0)}`}% 7d
          </span>
        </div>
      </div>
    </Link>
  );
}
