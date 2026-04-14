type ChangeCardProps = {
  label: string;
  value: number;
  unit?: string;
  note?: string;
  staticValue?: string;
};

export default function ChangeCard({ label, value, unit = "km²", note, staticValue }: ChangeCardProps) {
  const isPositive = value > 0;
  const isNegative = value < 0;

  const valueColor = isPositive
    ? "text-red-600"
    : isNegative
    ? "text-green-600"
    : "text-slate-700";

  const subtext = isPositive ? "Russia gained" : isNegative ? "Ukraine gained" : "No change";
  const valueDisplay = isPositive
    ? `−${value} ${unit}`
    : isNegative
    ? `+${Math.abs(value)} ${unit}`
    : `0 ${unit}`;

  if (staticValue) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6 text-center">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{label}</div>
        <div className="text-4xl font-black text-slate-900">{staticValue}</div>
        {note && <div className="text-xs text-slate-400 mt-2">{note}</div>}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6 text-center">
      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{label}</div>
      <div className={`text-4xl font-black ${valueColor}`}>{valueDisplay}</div>
      <div className="text-xs text-slate-400 mt-2">{subtext}</div>
      {note && <div className="text-xs text-slate-400 mt-1 line-clamp-2">{note}</div>}
    </div>
  );
}
