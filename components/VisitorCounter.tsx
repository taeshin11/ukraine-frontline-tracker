"use client";
import { useEffect, useState } from "react";
export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => { fetch("/api/visitor").then(r=>r.json()).then(d=>setCount(d.count)).catch(()=>{}); }, []);
  if (count === null) return null;
  return <span className="text-xs text-slate-400 border border-slate-700 px-2.5 py-1 rounded-full ml-2">{count.toLocaleString()} visits</span>;
}
