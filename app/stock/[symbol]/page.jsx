

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import StockChart from "../../../components/StockChart";
import useSWR from "swr";
import Footer from "../../../components/Footer";

export default function StockPage() {
  const params = useParams();
  const symbol = params.symbol;

  const [price, setPrice] = useState(null);
  const [change, setChange] = useState(null);
  const [stats, setStats] = useState(null);
  const [prevPrice, setPrevPrice] = useState(null);
  const [flash, setFlash] = useState("");
  const [range, setRange] = useState("1M");
  const numericChange = Number(change) || 0;
  const isPositive = numericChange >= 0;
  const getMarketStatus = () => {
    const now = new Date();

    const istTime = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );

    const day = istTime.getDay(); // 0 = Sunday, 6 = Saturday

    // ❌ Weekend check
    if (day === 0 || day === 6) return false;

    const hours = istTime.getHours();
    const minutes = istTime.getMinutes();

    const current = hours * 60 + minutes;

    const open = 9 * 60 + 15;
    const close = 15 * 60 + 30;

    return current >= open && current <= close;
  };


  // 🔥 STOCK FETCH
  const fetchStock = async () => {
    try {
      const res = await fetch(
        `/api/stocks/${symbol}`
      );
      const data = await res.json();

      setStats(data);
      setPrice(data.price);
      setChange(data.change || 0);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStock();

    const interval = setInterval(fetchStock, 15000);
    return () => clearInterval(interval);
  }, [symbol]);

  // 🔥 SWR CHART (MAIN FIX)
  const fetcher = (url) => fetch(url).then(res => res.json());

  const { data: chartData, isLoading } = useSWR(
    `/api/stocks/chart/${symbol}?range=${range}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  // 🔥 FLASH EFFECT
  useEffect(() => {
    if (prevPrice !== null && price !== null) {
      if (price > prevPrice) setFlash("up");
      else if (price < prevPrice) setFlash("down");

      setTimeout(() => setFlash(""), 500);
    }
    setPrevPrice(price);
  }, [price]);

  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">

      {/* 🔥 glow effect */}
      {/* <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[120px] top-10 left-20"></div>
  <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[120px] bottom-10 right-20"></div> */}
      <div className="pointer-events-none absolute w-[400px] h-[400px] bg-blue-500/20 blur-[120px] top-10 left-20"></div>
      <div className="pointer-events-none absolute w-[400px] h-[400px] bg-purple-500/20 blur-[120px] bottom-10 right-20"></div>
      <Navbar />

      <div className="px-6 pt-24">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">{symbol}</h1>
          {/* <p className="text-sm text-gray-400 mt-1">
  Apple Inc. • NASDAQ • Technology
</p> */}
          <p className="text-sm text-gray-400 mt-1">
            {stats?.name || symbol} • {stats?.exchange || "Market"} • {stats?.sector || "Stock"}
          </p>
          {/* <p className="text-xs mt-2 text-green-400">
  ● Market Open
</p> */}
          <p
            className={`text-xs mt-2 ${getMarketStatus() ? "text-green-400" : "text-red-400"
              }`}
          >
            ● {getMarketStatus() ? "Market Open" : "Market Closed"}
          </p>

          {/* <div className="flex items-center gap-4 mt-2">
            <p
              className={`text-2xl font-semibold transition-all duration-300
              ${flash === "up" ? "text-green-400 scale-110" : ""}
              ${flash === "down" ? "text-red-400 scale-110" : ""}
            `}
            >
              ₹ {price || "..."}
            </p>

            <p
              className={`text-lg flex items-center gap-1
              ${parseFloat(change) >= 0 ? "text-green-400" : "text-red-400"}
            `}
            >
              {parseFloat(change) >= 0 ? "🔺" : "🔻"} {change}%
            </p>
          </div> */}
          <div className="flex items-end gap-4 mt-4">

            <div>
              <p className={`text-5xl font-bold tracking-tight transition-all duration-300
      ${flash === "up" ? "text-green-400 scale-105" : ""}
      ${flash === "down" ? "text-red-400 scale-105" : ""}
    `}>
                ₹ {price || "..."}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Last updated just now
              </p>
            </div>

            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium
      ${isPositive
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
                }
    `}
            >
              <span>{isPositive ? "▲" : "▼"}</span>
              <span>
                {isNaN(numericChange) ? "0.00" : numericChange.toFixed(2)}%
              </span>
            </div>

          </div>
        </div>

        {/* RANGE BUTTONS */}
        <div className="flex gap-3 mb-4">
          {["1D", "1W", "1M", "1Y"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300
  ${range === r
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-105"
                  : "bg-white/10 text-gray-300 hover:bg-white/20 hover:scale-105"}`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">



          {/* CHART */}
          {/* <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-2xl p-4">
            {isLoading || !chartData ? (
              <p className="text-center">Loading chart...</p>
            ) : (
              <StockChart data={chartData} />
            )}
          </div> */}
          <div className="lg:col-span-2 rounded-2xl p-[1px] bg-gradient-to-r from-blue-500/30 to-purple-500/30">
            <div className="bg-[#020617] rounded-2xl p-4 backdrop-blur-xl hover:shadow-blue-500/20 hover:shadow-xl transition-all duration-300">

              <div className="flex justify-between items-center mb-3">
                <p className="text-sm text-gray-400">Price Chart</p>
                <p className="text-xs text-gray-500">Last updated: live</p>
              </div>

              {isLoading ? (
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                  Loading chart...
                </div>
              ) : (
                <StockChart data={chartData} />
              )}

            </div>
          </div>

          {/* STATS */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 space-y-4">
            {/* <h2 className="text-xl font-semibold mb-4">Market Stats</h2>

            {stats ? (
              <>
                <div className="flex justify-between">
                  <span>Open</span>
                  <span>₹ {stats.open}</span>
                </div>

                <div className="flex justify-between">
                  <span>High</span>
                  <span>₹ {stats.high}</span>
                </div>

                <div className="flex justify-between">
                  <span>Low</span>
                  <span>₹ {stats.low}</span>
                </div>

                <div className="flex justify-between">
                  <span>Prev Close</span>
                  <span>₹ {stats.prevClose}</span>
                </div>
              </>
            ) : (
              <p className="text-gray-400">Loading stats...</p>
            )} */}

            <h2 className="text-xl font-semibold mb-4">Market Stats</h2>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Open", value: stats?.open, icon: "📂" },
                { label: "High", value: stats?.high, icon: "🔼" },
                { label: "Low", value: stats?.low, icon: "🔽" },
                { label: "Prev Close", value: stats?.prevClose, icon: "⏱️" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4 
                 hover:scale-105 hover:border-blue-400/30 transition-all"
                >
                  <p className="text-xs text-gray-400">
                    {item.icon} {item.label}
                  </p>
                  <p className="text-lg font-semibold mt-1">
                    ₹ {item.value || "--"}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>

  );
}