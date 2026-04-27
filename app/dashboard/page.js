// "use client";

// import { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import MarketInfoCard from "../../components/MarketInfoCard";
// import BigChart from "../../components/BigChart";
// import { useRouter } from "next/navigation";

// export default function Dashboard() {
//   const [market, setMarket] = useState([]);
//   const [stocks, setStocks] = useState([]);
//   const [featured, setFeatured] = useState(null);
//   const [chartData, setChartData] = useState([]);

//   const router = useRouter();

//   // 🔥 FETCH MARKET DATA (NIFTY + SENSEX)
//   useEffect(() => {
//     fetch("http://localhost:5000/api/stocks/index/market")
//       .then((res) => res.json())
//       .then(setMarket);
//   }, []);

//   // 🔥 FETCH STOCKS
//   useEffect(() => {
//     fetch("http://localhost:5000/api/stocks/multi/demo")
//       .then((res) => res.json())
//       .then((data) => {
//   setStocks(data);
//   setFeatured(data[0]); // 🔥 important
// });
//       });
//   }, []);

//   // 🔥 FETCH FEATURED CHART (FIRST STOCK)
//   useEffect(() => {
//     if (!stocks.length) return;

//     fetch(`http://localhost:5000/api/stocks/chart/${stocks[0].symbol}`)
//       .then((res) => res.json())
//       .then(setChartData);
//   }, [stocks]);

//   // 🔥 SORT GAINERS / LOSERS (REAL LOGIC)
//   const gainers = [...stocks]
//     .filter((s) => parseFloat(s.change) > 0)
//     .sort((a, b) => parseFloat(b.change) - parseFloat(a.change))
//     .slice(0, 3);

//   const losers = [...stocks]
//     .filter((s) => parseFloat(s.change) < 0)
//     .sort((a, b) => parseFloat(a.change) - parseFloat(b.change))
//     .slice(0, 3);

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen bg-[#020617] text-white px-6 py-24 max-w-6xl mx-auto">

//         {/* 🔥 MARKET SNAPSHOT */}
//         <h2 className="text-2xl font-semibold mb-6">Market Snapshot</h2>

//         <div className="grid md:grid-cols-3 gap-6">
//           {market.map((item, i) => (
//             <MarketInfoCard key={i} title={item.name} data={item} />
//           ))}
//         </div>

//         {/* 🔥 QUICK STATS */}
//         <div className="grid md:grid-cols-4 gap-4 mt-10">

//           <div className="bg-white/5 p-4 rounded-xl border border-white/10">
//             <p className="text-gray-400 text-sm">Total Stocks</p>
//             <p className="text-xl font-semibold">{stocks.length}</p>
//           </div>

//           <div className="bg-white/5 p-4 rounded-xl border border-white/10">
//             <p className="text-gray-400 text-sm">Top Gainer</p>
//             <p className="text-green-400 text-sm">
//               {gainers[0]?.symbol || "--"}
//             </p>
//           </div>

//           <div className="bg-white/5 p-4 rounded-xl border border-white/10">
//             <p className="text-gray-400 text-sm">Top Loser</p>
//             <p className="text-red-400 text-sm">
//               {losers[0]?.symbol || "--"}
//             </p>
//           </div>

//           <div className="bg-white/5 p-4 rounded-xl border border-white/10">
//             <p className="text-gray-400 text-sm">Market Status</p>
//             <p className="text-sm text-green-400">Live</p>
//           </div>

//         </div>

//         {/* 🔥 FEATURED STOCK */}
//         <h2 className="text-2xl font-semibold mt-20 mb-6">Featured Stock</h2>

//         <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

//           <h3 className="text-lg font-medium mb-2">
//             {stocks[0]?.symbol}
//           </h3>

//           <p className="text-xl mb-2">
//             ₹ {stocks[0]?.price}
//           </p>

//           <div className="h-[300px]">
//             <BigChart data={chartData} />
//           </div>

//         </div>

//         {/* 🔥 TOP MOVERS */}
//         <h2 className="text-2xl font-semibold mt-20 mb-6">Top Movers</h2>

//         <div className="grid md:grid-cols-2 gap-6">

//           <div className="bg-white/5 border border-white/10 rounded-xl p-4">
//             <h3 className="text-green-400 mb-3">Gainers</h3>

//             {gainers.map((s, i) => (
//               <div
//                 key={i}
//                 onClick={() => router.push(`/stock/${s.symbol}`)}
//                 className="flex justify-between py-2 cursor-pointer hover:text-green-300"
//               >
//                 <span>{s.symbol}</span>
//                 <span>{s.change}%</span>
//               </div>
//             ))}
//           </div>

//           <div className="bg-white/5 border border-white/10 rounded-xl p-4">
//             <h3 className="text-red-400 mb-3">Losers</h3>

//             {losers.map((s, i) => (
//               <div
//                 key={i}
//                 onClick={() => router.push(`/stock/${s.symbol}`)}
//                 className="flex justify-between py-2 cursor-pointer hover:text-red-300"
//               >
//                 <span>{s.symbol}</span>
//                 <span>{s.change}%</span>
//               </div>
//             ))}
//           </div>

//         </div>

//         {/* 🔥 WATCHLIST PREVIEW */}
//         <h2 className="text-2xl font-semibold mt-20 mb-6">Your Watchlist</h2>

//         <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">

//           <p className="text-gray-400 mb-4">
//             Login to save your watchlist
//           </p>

//           <button
//             onClick={() => router.push("/watchlist")}
//             className="border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition"
//           >
//             Go to Watchlist
//           </button>

//         </div>

//       </div>

//       <Footer />
//     </>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MarketInfoCard from "../../components/MarketInfoCard";
import BigChart from "../../components/BigChart";
import { useRouter } from "next/navigation";
import StockCard from "../../components/StockCard";
// import StockCard from "../../components/StockCard";

export default function Dashboard() {
  const [market, setMarket] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [chartData, setChartData] = useState([]);

  const router = useRouter();
const getMarketStatus = () => {
  const now = new Date();

  const ist = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  const day = ist.getDay();
  if (day === 0 || day === 6) return false;

  const minutes = ist.getHours() * 60 + ist.getMinutes();

  return minutes >= 555 && minutes <= 930; // 9:15–3:30
};
  // 🔥 MARKET
  useEffect(() => {
    fetch("/api/stocks/index/market")
      .then((res) => res.json())
      .then(setMarket);
  }, []);

  // 🔥 STOCKS
  useEffect(() => {
    fetch("/api/stocks/multi/demo")
      .then((res) => res.json())
      .then((data) => {
        setStocks(data);
        setFeatured(data[0]); // default
      });
  }, []);

  useEffect(() => {
    if (!stocks.length) return;

    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % stocks.length;
      setFeatured(stocks[index]);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [stocks]);

  // 🔥 FEATURED CHART (FIXED)
  useEffect(() => {
    if (!featured) return;

    fetch(`/api/stocks/chart/${featured.symbol}`)
      .then((res) => res.json())
      .then(setChartData);
  }, [featured]);

  // 🔥 GAINERS / LOSERS
  const gainers = [...stocks]
    .filter((s) => parseFloat(s.change) > 0)
    .sort((a, b) => parseFloat(b.change) - parseFloat(a.change))
    .slice(0, 3);

  const losers = [...stocks]
    .filter((s) => parseFloat(s.change) < 0)
    .sort((a, b) => parseFloat(a.change) - parseFloat(b.change))
    .slice(0, 3);

  return (
    <>
      <Navbar />

      {/* <div className="min-h-screen bg-[#020617] text-white px-6 py-24 max-w-6xl mx-auto "> */}
      <div className="min-h-screen bg-[#020617] text-white px-3 sm:px-6 py-24 mt-7 sm:mt-0 max-w-6xl mx-auto sm:py-32">

        {/* MARKET SNAPSHOT */}
        <h2 className="text-2xl font-semibold mb-6">Market Snapshot</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {market.map((item, i) => (
            <MarketInfoCard
              className="hover:scale-[1.02] transition-all duration-300"
              key={i}
              title={item.name}
              data={item}
            />
          ))}
        </div>

        {/* QUICK STATS */}
        <div className="grid md:grid-cols-4 gap-4 mt-10">

          <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:scale-[1.02] transition">
            <p className="text-gray-400 text-sm">Total Stocks</p>
            <p className="text-xl font-semibold">{stocks.length}</p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:scale-[1.02] transition">
            <p className="text-gray-400 text-sm">Top Gainer</p>
            <p className="text-green-400 text-sm">
              {gainers[0]?.symbol || "--"}
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:scale-[1.02] transition">
            <p className="text-gray-400 text-sm">Top Loser</p>
            <p className="text-red-400 text-sm">
              {losers[0]?.symbol || "--"}
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:scale-[1.02] transition">
            <p className="text-gray-400 text-sm">Market Status</p>
            <div className="flex items-center gap-2">
  <span className={`w-2 h-2 rounded-full animate-pulse ${
    getMarketStatus() ? "bg-green-400" : "bg-red-400"
  }`} />

  <span className={`text-sm ${
    getMarketStatus() ? "text-green-400" : "text-red-400"
  }`}>
    {getMarketStatus() ? "Market Open" : "Market Closed"}
  </span>
</div>
          </div>

        </div>

        {/* FEATURED STOCK */}
        <h2 className="text-2xl font-semibold mt-20 mb-6">Featured Stock</h2>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 
hover:scale-[1.01] transition-all duration-300">

          {featured && (
            <>
              <h3 className="text-lg font-medium mb-2">
                {featured.symbol}
              </h3>

              <p className="text-xl mb-2">
                ₹ {featured.price}
              </p>
              <p
                className={`text-sm ${parseFloat(featured?.change) >= 0
                  ? "text-green-400"
                  : "text-red-400"
                  }`}
              >
                {featured?.change}%
              </p>

              <div className="h-[300px]">
                <BigChart data={chartData} />
              </div>

              {/* CTA */}
              <button
                onClick={() => router.push(`/stock/${featured.symbol}`)}
                className="mt-4 text-sm border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition"
              >
                View Details →
              </button>
            </>
          )}

        </div>

        {/* TOP MOVERS */}
        <h2 className="text-2xl font-semibold mt-20 mb-6">Top Movers</h2>

        <div className="grid md:grid-cols-2 gap-6">

          {/* GAINERS */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-green-400 mb-3">Gainers</h3>

            {gainers.map((s, i) => (
              <StockCard
                key={i}
                stock={s}
                onClick={() => router.push(`/stock/${s.symbol}`)}
              />
            ))}
          </div>

          {/* LOSERS */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-red-400 mb-3">Losers</h3>

            {losers.map((s, i) => (
              <StockCard
                key={i}
                stock={s}
                onClick={() => router.push(`/stock/${s.symbol}`)}
              />
            ))}
          </div>

        </div>

        {/* WATCHLIST */}
        <h2 className="text-2xl font-semibold mt-20 mb-6">Your Watchlist</h2>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:scale-[1.01] transition">

          <p className="text-gray-400 mb-4">
            ✨ Save your favorite stocks and track them easily
          </p>

          <button
            onClick={() => router.push("/watchlist")}
            className="border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Go to Watchlist
          </button>

        </div>

      </div>

      <Footer />
    </>
  );
}