export default function MapPlaceholder() {
  return (
    <div className="w-full bg-gray-900 border border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px]">
      <div className="text-4xl mb-3">🗺️</div>
      <h3 className="text-white font-semibold mb-2">Interactive Frontline Map</h3>
      <p className="text-gray-400 text-sm text-center max-w-md mb-4">
        Live frontline map data provided by the Institute for the Study of War (ISW).
        Updated daily.
      </p>
      <a
        href="https://www.understandingwar.org/backgrounder/ukraine-conflict-updates"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-900 border border-blue-700 text-blue-300 px-4 py-2 rounded-lg text-sm hover:bg-blue-800 transition-colors"
      >
        View ISW Daily Map →
      </a>
      <p className="text-gray-600 text-xs mt-4">
        Source: Institute for the Study of War (ISW) · understandingwar.org
      </p>
    </div>
  );
}
