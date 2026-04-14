export default function MapPlaceholder() {
  return (
    <div className="w-full bg-slate-800 rounded-2xl border border-slate-700 p-8 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 to-slate-900/60"></div>
      <div className="relative z-10 text-center">
        <div className="text-5xl mb-4">🗺️</div>
        <h3 className="text-white font-bold text-lg mb-2">Interactive Frontline Map</h3>
        <p className="text-slate-400 text-sm text-center max-w-md mb-6">
          Live frontline map data provided by the Institute for the Study of War (ISW). Updated daily.
        </p>
        <a
          href="https://www.understandingwar.org/backgrounder/ukraine-conflict-updates"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          View ISW Daily Map ↗
        </a>
        <p className="text-slate-600 text-xs mt-4">Source: Institute for the Study of War (ISW) · understandingwar.org</p>
      </div>
    </div>
  );
}
