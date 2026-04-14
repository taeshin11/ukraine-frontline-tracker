"use client";

import ReactECharts from "echarts-for-react";

type Snapshot = {
  date: string;
  russia_controlled_km2: number;
  ukraine_controlled_km2: number;
  frontline_length_km: number;
};

export default function FrontlineChart({ snapshots }: { snapshots: Snapshot[] }) {
  const sorted = [...snapshots].sort((a, b) => a.date.localeCompare(b.date));
  const dates = sorted.map((s) => s.date);
  const russiaData = sorted.map((s) => s.russia_controlled_km2);
  const ukraineData = sorted.map((s) => s.ukraine_controlled_km2);

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      backgroundColor: "#1f2937",
      borderColor: "#374151",
      textStyle: { color: "#f3f4f6" },
    },
    legend: {
      data: ["Russia controlled", "Ukraine controlled"],
      textStyle: { color: "#9ca3af" },
    },
    grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    xAxis: {
      type: "category",
      data: dates,
      axisLabel: { color: "#9ca3af", fontSize: 11 },
      axisLine: { lineStyle: { color: "#374151" } },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "#9ca3af", fontSize: 11, formatter: (v: number) => `${(v / 1000).toFixed(0)}k` },
      splitLine: { lineStyle: { color: "#1f2937" } },
    },
    series: [
      {
        name: "Russia controlled",
        type: "line",
        data: russiaData,
        smooth: true,
        itemStyle: { color: "#ef4444" },
        areaStyle: { color: "rgba(239,68,68,0.1)" },
      },
      {
        name: "Ukraine controlled",
        type: "line",
        data: ukraineData,
        smooth: true,
        itemStyle: { color: "#3b82f6" },
        areaStyle: { color: "rgba(59,130,246,0.1)" },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: "300px" }} />;
}
