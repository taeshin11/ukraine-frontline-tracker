type ChangeCardProps = {
  label: string;
  value: number;
  unit?: string;
  note?: string;
};

export default function ChangeCard({ label, value, unit = "km²", note }: ChangeCardProps) {
  // Positive = Russia gaining = bad (red), Negative = Ukraine gaining = good (green), 0 = gray
  const isPositive = value > 0;
  const isNegative = value < 0;
  const isZero = value === 0;

  const colorClass = isPositive
    ? "bg-red-950 border-red-800 text-red-300"
    : isNegative
    ? "bg-green-950 border-green-800 text-green-300"
    : "bg-gray-900 border-gray-700 text-gray-300";

  const valueDisplay = isPositive ? `+${value}` : `${value}`;
  const arrow = isPositive ? "▲" : isNegative ? "▼" : "—";

  return (
    <div className={`border rounded-lg p-4 ${colorClass}`}>
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold">{arrow} {valueDisplay}</span>
        <span className="text-sm opacity-70">{unit}</span>
      </div>
      {note && <div className="text-xs mt-2 opacity-70">{note}</div>}
      {isZero && <div className="text-xs mt-1 text-gray-500">No change</div>}
    </div>
  );
}
