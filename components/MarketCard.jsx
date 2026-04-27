"use client";

import Sparkline from "./Sparkline";

export default function MarketGraph({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mt-3
    hover:scale-[1.01] transition-all duration-300 shadow-[0_0_40px_rgba(59,130,246,0.1)]">

      <Sparkline
        large
        data={data.chart || []}
      />

    </div>
  );
}