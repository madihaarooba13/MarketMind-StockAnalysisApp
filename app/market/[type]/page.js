"use client";

import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import BigChart from "../../../components/BigChart";
import { useEffect, useState } from "react";

// ✅ MARKET STATUS
const getMarketStatus = () => {
  const now = new Date();
  const ist = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  const day = ist.getDay();
  if (day === 0 || day === 6) return false;

  const minutes = ist.getHours() * 60 + ist.getMinutes();
  return minutes >= 555 && minutes <= 930;
};

export default function MarketDetail() {
  const params = useParams();

  const [chartData, setChartData] = useState([]);
  const [marketData, setMarketData] = useState(null);
  const [range, setRange] = useState("1D");
  const [loading, setLoading] = useState(true);

  const isNifty = params.type === "nifty";
  const symbol = isNifty ? "^NSEI" : "^BSESN";
  const marketName = isNifty ? "NIFTY 50" : "SENSEX";
  // 🔥 COLOR LOGIC (based on % change)
const change = Number(marketData?.change);

const isUp = !isNaN(change) ? change >= 0 : true;

const chartColor = isUp ? "#22c55e" : "#ef4444";

  // 🔥 FETCH MARKET INFO (same as home)
  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const res = await fetch(
          "/api/stocks/index/market"
        );
        const data = await res.json();

        setMarketData(isNifty ? data[0] : data[1]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMarket();
  }, [params]);

  // 🔥 FETCH CHART
  useEffect(() => {
    const fetchChart = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `/api/stocks/chart/${symbol}?range=${range}`
        );

        const data = await res.json();
        setChartData(data);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    fetchChart();
  }, [range, params]);

  return (
    <div className="min-h-screen bg-[#020617] text-white mt-10">

      <Navbar />

      <div className="px-4 sm:px-6 pt-24 pb-16 max-w-6xl mx-auto">

        {/* 🔥 HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">
            {marketName}
          </h1>

          {/* REAL PRICE */}
          <p className="text-4xl font-bold mt-3">
            ₹ {marketData?.price || "--"}
          </p>

          {/* CHANGE */}
          <p className={`mt-1 text-sm ${
            parseFloat(marketData?.change) >= 0
              ? "text-green-400"
              : "text-red-400"
          }`}>
            {marketData?.change || "0"}%
          </p>

          {/* OPEN HIGH LOW */}
          <div className="flex gap-6 mt-4 text-sm text-gray-400">
            <span>Open: ₹ {marketData?.open}</span>
            <span>High: ₹ {marketData?.high}</span>
            <span>Low: ₹ {marketData?.low}</span>
          </div>

          {/* STATUS */}
          <p className={`mt-3 text-sm ${
            getMarketStatus() ? "text-green-400" : "text-red-400"
          }`}>
            ● {getMarketStatus() ? "Market Open" : "Market Closed"}
          </p>
        </div>

        {/* 🔥 RANGE */}
        <div className="flex gap-3 mb-5 flex-wrap">
          {["1D", "1W", "1M", "1Y"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-1.5 rounded-full text-sm transition ${
                range === r
                  ? "bg-blue-500 text-white"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* 🔥 CHART */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

          {loading ? (
            <div className="h-[300px] flex items-center justify-center text-gray-400 animate-pulse">
              Loading chart...
            </div>
          ) : (
            <BigChart data={chartData} color={chartColor} />
          )}

        </div>

      </div>

      <Footer />
    </div>
  );
}