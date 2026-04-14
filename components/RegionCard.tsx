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
  "active-combat": "bg-red-900 text-red-300",
  "contested": "bg-orange-900 text-orange-300",
  "relatively-stable": "bg-green-900 text-green-300",
};

export default function RegionCard({ region }: { region: Region }) {
  const changeColor = region.change_7d > 0 ? "text-red-400" : region.change_7d < 0 ? "text-green-400" : "text-gray-400";
  const changeArrow = region.change_7d > 0 ? "▲" : region.change_7d < 0 ? "▼" : "→";

  return (
    <Link href={`/region/${region.slug}`} className="block bg-gray-900 border border-gray-700 rounded-lg p-4 hover:border-blue-500 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-white text-sm">{region.name}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full ml-2 shrink-0 ${STATUS_STYLES[region.status] || "bg-gray-700 text-gray-300"}`}>
          {region.status.replace(/-/g, " ")}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Russian control</span>
            <span className={changeColor}>{changeArrow} {region.change_7d}% (7d)</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full transition-all"
              style={{ width: `${region.russian_control_pct}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">{region.russian_control_pct}%</div>
        </div>
      </div>

      <p className="text-xs text-gray-400 mb-3 line-clamp-2">{region.summary}</p>

      <div className="flex flex-wrap gap-1">
        {region.key_locations.slice(0, 3).map((loc) => (
          <span key={loc} className="text-xs bg-gray-800 px-1.5 py-0.5 rounded text-gray-400">{loc}</span>
        ))}
        {region.key_locations.length > 3 && (
          <span className="text-xs text-gray-600">+{region.key_locations.length - 3} more</span>
        )}
      </div>
    </Link>
  );
}
