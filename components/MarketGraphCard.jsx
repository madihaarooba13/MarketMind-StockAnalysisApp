"use client";

import BigChart from "./BigChart";

export default function MarketGraphCard({ data }) {
  if (!data) return null;

  const chartData = data.chart || [];

  // ✅ USE CHANGE DIRECTLY
  const change = Number(data.change);

  let isUp = true;

  if (!isNaN(change)) {
    isUp = change >= 0;
  }

  const color = isUp ? "#22c55e" : "#ef4444";

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white/5 via-white/2 to-transparent backdrop-blur-xl border border-white/10 rounded-2xl p-4 h-full">
      <div className="flex justify-between mb-2 text-sm text-gray-400">
        <span>Today</span>

        <span className={isUp ? "text-green-400" : "text-red-400"}>
          Live
        </span>
      </div>

      <BigChart data={chartData} color={color} />
    </div>
  );
}