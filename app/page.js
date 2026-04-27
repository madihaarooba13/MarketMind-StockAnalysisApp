// "use client";

// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import Image from "next/image";
// import { useEffect } from "react";

// export default function Home() {
//   const [price, setPrice] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [symbol, setSymbol] = useState("");
//   const [stocks, setStocks] = useState([]);


//   const fetchStock = async (symbol) => {
//   try {
//     setLoading(true);
//     setSymbol(symbol);

//     const res = await fetch(`http://localhost:5000/api/stocks/${symbol}`);
//     const data = await res.json();

//     if (!data.price) {
//       setPrice("Invalid ❌");
//     } else {
//       setPrice(data.price);
//     }

//   } catch (err) {
//     console.error(err);
//     setPrice("Error ❌");
//   }

//   setLoading(false);
// };
// const fetchMultipleStocks = async () => {
//   try {
//     const res = await fetch("http://localhost:5000/api/stocks/multi/demo");
//     const data = await res.json();
//     setStocks(data);
//   } catch (err) {
//     console.error(err);
//   }
// };
// useEffect(() => {
//   fetchMultipleStocks();
// }, []);

//   return (
//     <div className="w-full overflow-x-hidden bg-gray-50 dark:bg-[#020617] text-gray-900 dark:text-white transition-colors duration-300">

//       {/* Navbar */}
//       <Navbar onSearch={fetchStock} />

//       {/* Hero Section */}
//       <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">

//         {/* Image */}
//         <Image
//           src="/stock.jpg"
//           alt="stock"
//           fill
//           priority
//           sizes="100vw"
//           className="object-cover"
//         />

//         {/* Overlay (adaptive) */}
//         <div className="absolute inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-[2px]" />

//         {/* Content */}
//         <div className="relative z-10 text-center flex flex-col items-center px-4 -mt-10">

//           <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-white">
//             Analyze Stocks <br /> Smarter 📈
//           </h1>

//           <p className=" text-white mb-6 text-sm sm:text-base md:text-lg opacity-90">
//             Real-time insights. Better decisions.
//           </p>

//           <button className="bg-blue-500 text-white px-6 py-3 rounded-lg transition-all duration-300 cursor-pointer hover:bg-blue-600 hover:scale-105 active:scale-95">
//             Start Exploring 🚀
//           </button>
//           {loading && (
//   <p className="text-blue-400 mt-4">Loading...</p>
// )}

// {price && (
//   <div className="mt-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-6 py-4 shadow-[0_0_20px_rgba(59,130,246,0.6)]">

//     <h2 className="text-xl font-semibold">
//       {symbol}
//     </h2>

//     <p className="text-2xl text-green-400 mt-2">
//       {price === "Invalid ❌" || price === "Error ❌"
//         ? price
//         : `₹ ${price}`}
//     </p>

//   </div>
// )}

//         </div>

//       </section>

//       <section className="py-16 px-6">
//   <h2 className="text-2xl font-bold mb-6 text-center">
//     Trending Stocks 📊
//   </h2>

//   <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//     {stocks.map((stock, i) => (
//       <div
//         key={i}
//         className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:scale-105 transition"
//       >
//         <h3 className="text-lg font-semibold">{stock.symbol}</h3>
//         <p className="text-2xl text-green-400 mt-2">
//           ₹ {stock.price}
//         </p>
//       </div>
//     ))}
//   </div>
// </section>


//      </div>
//   );
// }


"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useRouter, useSearchParams } from "next/navigation";
import Sparkline from "../components/Sparkline";
import MarketCard from "../components/MarketCard";
import MarketGraph from "../components/MarketGraph";
import Footer from "../components/Footer";
// import { useRouter } from "next/navigation";
import MarketInfoCard from "../components/MarketInfoCard";
import MarketGraphCard from "../components/MarketGraphCard";
import Image from "next/image";
import StockChart from "../components/StockChart";
import { motion } from "framer-motion";
export default function Home() {
  // const [price, setPrice] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [symbol, setSymbol] = useState("");
  const [stocks, setStocks] = useState([]);
  // const [chartData, setChartData] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);
  // const [searched, setSearched] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();
  const [market, setMarket] = useState([]);
  // const searchParams = useSearchParams();

  // useEffect(() => {
  //   if (!searchParams) return;

  //   const login = searchParams.get("login");
  //   const logout = searchParams.get("logout");

  //   if (login === "success") {
  //     toast.success("Login successful 🎉");
  //     router.replace("/");
  //   }

  //   if (logout === "success") {
  //     toast.success("Logged out successfully 👋");
  //     router.replace("/");
  //   }
  // }, [searchParams]);


  useEffect(() => {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);

  const login = params.get("login");
  const logout = params.get("logout");

  if (login === "success") {
    toast.success("Login successful 🎉");
    router.replace("/");
  }

  if (logout === "success") {
    toast.success("Logged out successfully 👋");
    router.replace("/");
  }
}, []);
  useEffect(() => {
    const fetchMarket = async () => {
      const res = await fetch("/api/stocks/index/market");
      const data = await res.json();
      setMarket(data);
    };

    fetchMarket();

    const interval = setInterval(fetchMarket, 60000); // auto refresh
    return () => clearInterval(interval);
  }, []);

  // 🔥 SINGLE STOCK SEARCH
  // const fetchStock = async (symbol) => {
  //   try {
  //     setLoading(true);
  //     setSymbol(symbol);
  //     setChartData([]);

  //     const res = await fetch(`http://localhost:5000/api/stocks/${symbol}`);
  //     const data = await res.json();

  //     if (!data.price) {
  //       setPrice("Invalid ❌");
  //     } else {
  //       setPrice(data.price);
  //     }

  //     await fetchChart(symbol); // 👈 WAIT karo
  //        setSearched(true);
  //        window.scrollTo({
  //       top: window.innerHeight,
  //       behavior: "smooth",
  //     });

  //   } catch (err) {
  //     console.error(err);
  //     setPrice("Error ❌");
  //   }

  //   setLoading(false);
  // };

  // 🔥 MULTIPLE STOCKS
  const fetchMultipleStocks = async () => {
    try {
      const res = await fetch("/api/stocks/multi/demo");
      const data = await res.json();
      setStocks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchChart = async (symbol) => {
    try {
      setChartLoading(true);

      const res = await fetch(
        `/api/stocks/chart/${symbol}`
      );
      const data = await res.json();

      setChartData(data);
    } catch (err) {
      console.error(err);
    }

    setChartLoading(false);
  };

  useEffect(() => {
    fetchMultipleStocks();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="w-full min-h-screen bg-[#020617] text-white">

      {/* Navbar */}
      {/* <Navbar onSearch={fetchStock} /> */}
      <Navbar />



      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      ></motion.div>
      <section className={`relative w-full h-screen flex items-center justify-center transition-all duration-500 
${scrolled ? "opacity-40 blur-sm scale-95" : "opacity-100 scale-100"}`}>        <Image
          src="/stock.jpg"
          alt="stock"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

        <div className="relative z-10 text-center flex flex-col items-center 
bg-white/10 backdrop-blur-xl border border-white/10 
px-8 py-10 rounded-2xl shadow-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Analyze Stocks{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
              Smarter
            </span>{" "}
            📈
          </h1>

          <p className="text-gray-300 mb-8 max-w-xl text-center">
            Real-time insights. Better decisions.
          </p>

          {/* <button className="bg-gradient-to-r from-blue-500 to-cyan-500 
px-8 py-3 rounded-xl 
hover:scale-105 active:scale-95 
transition duration-200 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
            Start Exploring 🚀
          </button> */}
          <button
  onClick={() => router.push("/markets")}
  className="bg-gradient-to-r from-blue-500 to-cyan-500 
  px-8 py-3 rounded-xl 
  hover:scale-105 active:scale-95 
  transition duration-200 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
>
  Start Exploring 🚀
</button>
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-300">
            <span>⚡ Real-time data</span>
            <span>📊 Smart insights</span>
            <span>🔒 Secure & fast</span>
          </div>

          {/* {loading && <p className="mt-4">Loading...</p>} */}

          {/* {price && (
            <div className="mt-6 bg-white/10 backdrop-blur-lg p-6 rounded-xl">
              <h2 className="text-xl font-semibold">{symbol}</h2>
              <p className="text-2xl text-green-400 mt-2">
                {price === "Invalid ❌" || price === "Error ❌"
                  ? price
                  : `₹ ${price}`}
              </p>
            </div>
          )} */}
        </div>
      </section>


      {/* 🔥 MARKET OVERVIEW */}
      <div className="max-w-6xl mx-auto px-4 mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* NIFTY INFO */}
        <div
          className="cursor-pointer group 
  transition duration-300 
  hover:scale-[1.02] hover:-translate-y-1"

          onClick={() => router.push("/market/nifty")}
        >
          <MarketInfoCard title="NIFTY 50" data={market[0]} />
        </div>

        {/* NIFTY GRAPH */}
        <div
          className="cursor-pointer group 
  transition duration-300 
  hover:scale-[1.02] hover:-translate-y-1"
          onClick={() => router.push("/market/nifty")}
        >
          <MarketGraphCard data={market[0]} />
        </div>

        {/* SENSEX INFO */}
        <div
          className="cursor-pointer group 
  transition duration-300 
  hover:scale-[1.02] hover:-translate-y-1"
          onClick={() => router.push("/market/sensex")}
        >
          <MarketInfoCard title="SENSEX" data={market[1]} />
        </div>

        {/* SENSEX GRAPH */}
        <div
          className="cursor-pointer group 
  transition duration-300 
  hover:scale-[1.02] hover:-translate-y-1"
          onClick={() => router.push("/market/sensex")}
        >
          <MarketGraphCard data={market[1]} />
        </div>

      </div>




      {/* 🔥 TRENDING STOCKS */}
      <section className="py-16 px-6 my-5">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Trending Stocks 📊
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stocks.slice(0, 8).map((stock, i) => (

            <div
              key={i}
              onClick={() => router.push(`/stock/${stock.symbol}`)}
              className="cursor-pointer 
bg-gradient-to-br from-white/10 to-white/5 
backdrop-blur-xl 
border border-white/10 
p-6 rounded-2xl 
shadow-lg 
transition-all duration-300 

hover:scale-[1.03] 
hover:-translate-y-1 
hover:shadow-blue-500/20 
hover:border-blue-400/40"
            >
              <h3 className="text-lg font-semibold">{stock.symbol}</h3>

              <p className="text-2xl mt-2 font-semibold tracking-wide">

                ₹ {stock.price}
              </p>

              <p
                className={`mt-1 text-sm font-medium  ${parseFloat(stock.change) >= 0
                  ? "text-green-400"
                  : "text-red-400"
                  }`}
              >
                {stock.change}%
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* 🔥 Chart Loading */}
      {/* {chartLoading && (
  <p className="text-center mt-6 text-gray-400 animate-pulse">
  Loading chart 📈...
</p>
)} */}

      {/* 🔥 Chart */}
      {/* {chartData.length > 0 && (
  <div className="px-6">
    <h2 className="text-xl mt-10 text-center">
      {symbol} Chart 📈
    </h2>
    <StockChart data={chartData} />
  </div>
)} */}

      <Footer />
    </div>
  );
}