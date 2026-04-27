// "use client";

// export default function MarketInfoCard({ title, data }) {
//   if (!data) return null;

//   return (
//     <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full
//     hover:scale-[1.02] transition-all duration-300">

//       <p className="text-sm text-gray-400">{title}</p>

//       <p className="text-3xl font-bold mt-2">
//         ₹ {data.price}
//       </p>

//       <p className={`mt-2 ${
//         parseFloat(data.change) >= 0
//           ? "text-green-400"
//           : "text-red-400"
//       }`}>
//         {parseFloat(data.change) >= 0 ? "▲" : "▼"} {data.change}%
//       </p>

//     </div>
//   );
// }


"use client";

export default function MarketInfoCard({ title, data }) {
  if (!data) return null;

  const isUp = parseFloat(data.change) >= 0;

  return (
    <div
      className="group bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl 
border border-white/10 rounded-2xl p-6 h-full 
transition-all duration-300 
hover:scale-[1.02] hover:-translate-y-1
hover:shadow-lg hover:shadow-blue-500/10 
hover:border-blue-400/40"
    >
      <div className="flex flex-col gap-4 h-full">

        {/* TITLE */}
        <div>
          <p className="text-sm text-gray-400 flex items-center gap-2 group-hover:text-white transition">
            {title}
            <span
              className={`w-2 h-2 animate-pulse rounded-full ${isUp ? "bg-green-400" : "bg-red-400"
                }`}
            />
          </p>

          {/* PRICE */}
          <p
            className={`text-3xl font-bold mt-2 tracking-wide transition ${isUp ? "text-green-400" : "text-red-400"
              } animate-pulse`}
          >
            ₹ {data.price}
          </p>

          {/* CHANGE */}
          <p
            className={`mt-2 text-sm font-medium px-2 py-1 rounded-md inline-block ${isUp
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/10 text-red-400"
              }`}
          >
            {isUp ? "▲" : "▼"} {data.change}%
          </p>
        </div>



        {/* EXTRA INFO */}
        <div className="mt-4 text-xs text-gray-400 space-y-1 
border-t border-white/10 pt-3">
          <p>Open: ₹ {data.open}</p>
          <p>High: ₹ {data.high}</p>
          <p>Low: ₹ {data.low}</p>
        </div>
      </div>
      {/* <div className="mt-2 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent" /> */}
    </div>

  );
}