// "use client";

// import Sparkline from "./Sparkline";

// export default function MarketGraphCard({ data }) {
//   if (!data) return null;

//   return (
//     <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full
//     hover:scale-[1.02] transition-all duration-300">

//       <Sparkline large data={data.chart || []} />

//     </div>
//   );
// }

// "use client";

// // import Sparkline from "./Sparkline";

// export default function MarketGraphCard({ data }) {
//   if (!data) return null;

//   const isUp = parseFloat(data.change) >= 0;

//   return (
//     <div
//       className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl 
//       border border-white/10 rounded-2xl p-6 h-full 
//       transition-all duration-300 hover:scale-[1.02] 
//       hover:shadow-blue-500/20 hover:border-blue-400/30"
//     >
//       <div
//         className={`w-full h-full ${
//           isUp ? "text-green-400" : "text-red-400"
//         }`}
//       >
//         {/* <Sparkline
//           large
//           data={data.chart || []}
//         /> */}
//       </div>
//     </div>
//   );
// }
"use client";

import BigChart from "./BigChart";

export default function MarketGraphCard({ data }) {
  if (!data) return null;

  return (

    <div
      className="relative overflow-hidden 
  bg-gradient-to-br from-white/5 via-white/2 to-transparent 
  backdrop-blur-xl border border-white/10 rounded-2xl p-4 h-full
  transition-all duration-300 
  hover:scale-[1.02] hover:-translate-y-1
  group"
    >
      <div className="flex justify-between mb-2 text-sm text-gray-400">
        <span>Today</span>
        <span className="text-green-400">Live</span>
      </div>
      <div className="relative z-10">
        <BigChart data={data.chart || []} />
      </div>
    </div>
  );
}