

// "use client";

// import { useEffect, useState } from "react";
// import MarketInfoCard from "../../components/MarketInfoCard";
// import MarketGraphCard from "../../components/MarketGraphCard";
// import BigChart from "../../components/BigChart";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import { useRouter } from "next/navigation";

// export default function MarketsPage() {
//   const [market, setMarket] = useState([]);
//   const [stocks, setStocks] = useState([]);
//   const [selectedStock, setSelectedStock] = useState(null);
//   const [chartData, setChartData] = useState([]);

//   const router = useRouter();

//   // 🔥 FETCH MARKET
//   useEffect(() => {
//     const fetchMarket = async () => {
//       const res = await fetch("http://localhost:5000/api/stocks/index/market");
//       const data = await res.json();
//       setMarket(data);
//     };
//     fetchMarket();
//   }, []);

//   // 🔥 FETCH STOCKS
//   useEffect(() => {
//     const fetchStocks = async () => {
//       const res = await fetch("http://localhost:5000/api/stocks/multi/demo");
//       const data = await res.json();
//       setStocks(data);
//       setSelectedStock(data[0]); // default select
//     };
//     fetchStocks();
//   }, []);

//   // 🔥 FETCH CHART FOR SELECTED STOCK
//   useEffect(() => {
//     if (!selectedStock) return;

//     const fetchChart = async () => {
//       const res = await fetch(
//         `http://localhost:5000/api/stocks/chart/${selectedStock.symbol}`
//       );
//       const data = await res.json();
//       setChartData(data);
//     };

//     fetchChart();
//   }, [selectedStock]);

//   // 🔥 GAINERS / LOSERS
//   const gainers = stocks
//     .filter((s) => parseFloat(s.change) > 0)
//     .sort((a, b) => parseFloat(b.change) - parseFloat(a.change))
//     .slice(0, 3);

//   const losers = stocks
//     .filter((s) => parseFloat(s.change) < 0)
//     .sort((a, b) => parseFloat(a.change) - parseFloat(b.change))
//     .slice(0, 3);

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen bg-[#020617] text-white px-6 py-24 max-w-6xl mx-auto">

//         {/* 🔥 MARKET OVERVIEW */}
//         <h2 className="text-2xl font-semibold mb-6">Market Overview</h2>

//         <div className="grid md:grid-cols-2 gap-6">
//           {market.map((item, i) => (
//             <div
//               key={i}
//               className="grid md:grid-cols-2 gap-4 cursor-pointer hover:scale-[1.01] transition"
//               onClick={() =>
//                 router.push(`/market/${item.name === "NIFTY 50" ? "nifty" : "sensex"}`)
//               }
//             >
//               <MarketInfoCard title={item.name} data={item} />
//               <MarketGraphCard data={item} />
//             </div>
//           ))}
//         </div>

//         {/* 🔥 TOP MOVERS */}
//         <div className="grid md:grid-cols-2 gap-6 mt-16">

//           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 
// backdrop-blur-xl mt-4 md:mt-0 md:sticky md:top-24 h-fit">
//             <h3 className="text-green-400 font-semibold mb-4">Top Gainers</h3>

//             {gainers.map((stock, i) => (
//               <div
//                 key={i}
//                 className="flex justify-between py-2 border-b border-white/10 cursor-pointer hover:text-green-300 transition"
//                 onClick={() => router.push(`/stock/${stock.symbol}`)}
//               >
//                 <span>{stock.symbol}</span>
//                 <span>₹ {stock.price}</span>
//                 <span className="text-green-400">{stock.change}%</span>
//               </div>
//             ))}
//           </div>

//           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 
// backdrop-blur-xl mt-4 md:mt-0 md:sticky md:top-24 h-fit">
//             <h3 className="text-red-400 font-semibold mb-4">Top Losers</h3>

//             {losers.map((stock, i) => (
//               <div
//                 key={i}
//                 className="flex justify-between py-2 border-b border-white/10 cursor-pointer hover:text-red-300 transition"
//                 onClick={() => router.push(`/stock/${stock.symbol}`)}
//               >
//                 <span>{stock.symbol}</span>
//                 <span>₹ {stock.price}</span>
//                 <span className="text-red-400">{stock.change}%</span>
//               </div>
//             ))}
//           </div>

//         </div>

//         {/* 🔥 ALL STOCKS (VERTICAL + PREVIEW) */}
//         <h2 className="text-2xl font-semibold mt-16 mb-6">All Stocks</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

//           {/* LEFT LIST */}
//           <div className="space-y-3">
//             {stocks.map((stock, i) => (
//               <div
//                 key={i}
//                 onMouseEnter={() => setSelectedStock(stock)}
//                 onClick={() => router.push(`/stock/${stock.symbol}`)}
//                 className="flex justify-between items-center p-4 rounded-xl 
//                 bg-white/5 border border-white/10 cursor-pointer
//                 hover:bg-white/10 hover:scale-[1.01] transition-all duration-300"
//               >
//                 <div>
//                   <p className="font-medium">{stock.symbol}</p>
//                   <p className="text-xs text-gray-400">Stock</p>
//                 </div>

//                 <div className="text-right">
//                   <p>₹ {stock.price}</p>
//                   <p
//                     className={`text-sm ${
//                       parseFloat(stock.change) >= 0
//                         ? "text-green-400"
//                         : "text-red-400"
//                     }`}
//                   >
//                     {stock.change}%
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* RIGHT PREVIEW */}
//           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 
// backdrop-blur-xl mt-4 md:mt-0 md:sticky md:top-24 h-fit">

//             {selectedStock && (
//               <>
//                 <h3 className="text-lg font-semibold mb-2">
//                   {selectedStock.symbol}
//                 </h3>

//                 <p className="text-xl mb-1">
//                   ₹ {selectedStock.price}
//                 </p>

//                 <p
//                   className={`mb-4 ${
//                     parseFloat(selectedStock.change) >= 0
//                       ? "text-green-400"
//                       : "text-red-400"
//                   }`}
//                 >
//                   {selectedStock.change}%
//                 </p>

//                 {/* 🔥 CHART */}
//                 <div className="h-[320px]">
//                   <BigChart data={chartData} />
//                 </div>

//                 <div className="mt-4 flex justify-between text-sm text-gray-400">
//   <span>Open: ₹ {selectedStock.price}</span>
//   <span>High: ₹ {selectedStock.price}</span>
//   <span>Low: ₹ {selectedStock.price}</span>
// </div>

//                 <button
//                   onClick={() =>
//                     router.push(`/stock/${selectedStock.symbol}`)
//                   }
//                   className="mt-6 w-full border border-white/20 rounded-lg py-2 
//                   hover:bg-white/10 transition"
//                 >
//                   View Details
//                 </button>
//               </>
//             )}

//           </div>

//         </div>

//       </div>

//       <Footer />
//     </>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import MarketInfoCard from "../../components/MarketInfoCard";
import MarketGraphCard from "../../components/MarketGraphCard";
import BigChart from "../../components/BigChart";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import StockCard from "../../components/StockCard";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function MarketsPage() {
  const [market, setMarket] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(true);
  const listRef = useRef(null);


  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.email;
  const scrollUp = () => {
    listRef.current?.scrollBy({ top: -200, behavior: "smooth" });
  };

  const addToWatchlist = async (stock) => {
    if (!userId) {
      toast.error("Login first");
      return;
    }

    await fetch("api/watchlist/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        stock: {
          symbol: stock.symbol,
          price: stock.price,
          change: stock.change,
        },
      })
    });

    toast.success("Added to watchlist ⭐");
  };
  const scrollDown = () => {
    listRef.current?.scrollBy({ top: 200, behavior: "smooth" });
  };

  useEffect(() => {
    const el = listRef.current;

    const handleScroll = () => {
      if (!el) return;

      const { scrollTop, scrollHeight, clientHeight } = el;

      setShowTop(scrollTop > 10);
      setShowBottom(scrollTop + clientHeight < scrollHeight - 10);
    };

    if (el) {
      el.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  // MARKET FETCH
  useEffect(() => {
    fetch("/api/stocks/index/market")
      .then((res) => res.json())
      .then(setMarket);
  }, []);

  // STOCKS FETCH
  useEffect(() => {
    fetch("/api/stocks/multi/demo")
      .then((res) => res.json())
      .then((data) => {
        setStocks(data);
        setSelectedStock(data[0]);
      });
  }, []);

  // CHART FETCH
  useEffect(() => {
    if (!selectedStock) return;

    fetch(`/api/stocks/chart/${selectedStock.symbol}`)
      .then((res) => res.json())
      .then(setChartData);
  }, [selectedStock]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#020617] text-white px-6 py-24 max-w-6xl mx-auto mt-11">

        {/* MARKET OVERVIEW */}
        <h2 className="text-2xl font-semibold mb-6">Market Overview</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {market.map((item, i) => (
            <div
              key={i}
              className="grid md:grid-cols-2 gap-4 cursor-pointer"
              onClick={() =>
                router.push(`/market/${item.name === "NIFTY 50" ? "nifty" : "sensex"}`)
              }
            >
              <MarketInfoCard title={item.name} data={item} />
              <MarketGraphCard data={item} />
            </div>
          ))}
        </div>

        {/* ALL STOCKS */}
        <h2 className="text-2xl font-semibold mt-16 mb-6">All Stocks</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

          {/* LEFT LIST */}
          <div className="relative group border border-white/10 rounded-xl p-5 bg-white/5 
backdrop-blur-md transition-all duration-300 
hover:border-white/20 hover:shadow-lg hover:shadow-black/20 
mt-4 md:mt-0 md:sticky md:top-24 h-fit">
            <div
              ref={listRef}
              className="max-h-[550px] overflow-y-auto space-y-2 pr-2 scrollbar-hide"
            >
              {/* TOP SCROLL HINT */}
              <div className="sticky top-0 z-10 flex justify-center py-1 
bg-gradient-to-b from-[#020617] to-transparent">

                {showTop && (
                  <div className="sticky top-0 z-10 flex justify-center pt-2 pb-1 
  bg-gradient-to-b from-[#020617] to-transparent 
  opacity-0 group-hover:opacity-100 transition">

                    <button
                      onClick={scrollUp}
                      className="bg-white/10 hover:bg-white/20 
      text-white text-lg px-6 py-1 rounded-full 
      backdrop-blur-md transition"
                    >
                      ⌃
                    </button>

                  </div>
                )}

              </div>
              {stocks.map((stock, i) => (
                <StockCard
                  key={i}
                  stock={stock}
                  onClick={() => router.push(`/stock/${stock.symbol}`)}
                  onAdd={() => addToWatchlist(stock)}
                  onHover={() => setSelectedStock(stock)}
                />
              ))}

              {/* BOTTOM SCROLL HINT */}
              <div className="sticky bottom-0 z-10 flex justify-center py-1 
bg-gradient-to-t from-[#020617] to-transparent">

                {showBottom && (
                  <div className="sticky bottom-0 z-10 flex justify-center pt-1 pb-2 
  bg-gradient-to-t from-[#020617] to-transparent 
  opacity-0 group-hover:opacity-100 transition">

                    <button
                      onClick={scrollDown}
                      className="bg-white/10 hover:bg-white/20 
      text-white text-lg px-6 py-1 rounded-full 
      backdrop-blur-md transition"
                    >
                      ⌄
                    </button>

                  </div>
                )}

              </div>

            </div>
            {/* TOP FADE */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-8 
bg-gradient-to-b from-[#020617] to-transparent" />

            {/* BOTTOM FADE */}
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-10 
bg-gradient-to-t from-[#020617] to-transparent" />
          </div>

          {/* RIGHT PREVIEW */}
          <div className="hidden md:block border border-white/10 rounded-xl p-5 bg-white/5 
backdrop-blur-md transition-all duration-300 
hover:border-white/20 hover:shadow-lg hover:shadow-black/20 
md:mt-0 md:sticky md:top-24 h-fit">

            {selectedStock && (
              <>
                {/* HEADER */}
                <div className="mb-3">
                  <h3 className="text-lg font-medium">
                    {selectedStock.symbol}
                  </h3>

                  <p className="text-lg">
                    ₹ {selectedStock.price}
                  </p>

                  <p
                    className={`text-sm ${parseFloat(selectedStock.change) >= 0
                      ? "text-green-400"
                      : "text-red-400"
                      }`}
                  >
                    {selectedStock.change}%
                  </p>
                </div>

                {/* CHART */}
                <div className="h-[260px] rounded-lg overflow-hidden">
                  <BigChart data={chartData} />
                </div>

                {/* EXTRA INFO */}
                <div className="mt-4 grid grid-cols-3 text-sm text-gray-400">
                  <div>
                    <p className="text-xs">Open</p>
                    <p className="text-white">₹ {selectedStock.price}</p>
                  </div>

                  <div>
                    <p className="text-xs">High</p>
                    <p className="text-white">₹ {selectedStock.price}</p>
                  </div>

                  <div>
                    <p className="text-xs">Low</p>
                    <p className="text-white">₹ {selectedStock.price}</p>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  onClick={() =>
                    router.push(`/stock/${selectedStock.symbol}`)
                  }
                  className="mt-5 w-full border border-white/20 rounded-md py-2 text-sm 
        hover:bg-white/10 transition"
                >
                  View Details
                </button>
              </>
            )}

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}