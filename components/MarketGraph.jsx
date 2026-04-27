"use client";

import Sparkline from "./Sparkline";

export default function MarketGraph({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mt-3">

      <Sparkline
        large
        data={data.chart || []}
      />

    </div>
  );
}