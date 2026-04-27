// "use client";

// import { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import { useRouter } from "next/navigation";
// import StockCard from "../../components/StockCard";
// import { useSession } from "next-auth/react";

// export default function WatchlistPage() {
//   const [stocks, setStocks] = useState([]);
//   const router = useRouter();
//   const { data: session } = useSession();

// const userId = session?.user?.email;


//   // const userId = "demoUser"; // 🔥 replace later with auth

//   // useEffect(() => {
//   //   fetch(`http://localhost:5000/api/watchlist/${userId}`)
//   //     .then(res => res.json())
//   //     .then(data => setStocks(data.stocks || []));
//   // }, []);

//   useEffect(() => {
//   if (!userId) return;

//   fetch(`http://localhost:5000/api/watchlist/${userId}`)
//     .then(res => res.json())
//     .then(data => setStocks(data.stocks || []));
// }, [userId]);
//   // const removeStock = async (symbol) => {
//   //   await fetch("http://localhost:5000/api/watchlist/remove", {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //     body: JSON.stringify({ userId, symbol }),
//   //   });

//   //   setStocks(prev => prev.filter(s => s.symbol !== symbol));
//   // };

//   const removeStock = async (symbol) => {
//   await fetch("http://localhost:5000/api/watchlist/remove", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//   userId,
//   symbol,
// })
//   });

//   // 🔥 REFETCH FROM DB
//   const res = await fetch(`http://localhost:5000/api/watchlist/${userId}`);
//   const data = await res.json();
//   setStocks(data.stocks || []);
// };

//   return (
//     <>
//       <Navbar />


//       <div className="min-h-screen bg-[#020617] text-white px-6 py-24 max-w-5xl mx-auto">

//         <h2 className="text-2xl font-semibold mb-6">Your Watchlist</h2>

//         {!stocks || stocks.length === 0 ? (
//           <div className="text-center border border-dashed border-white/20 p-10 rounded-xl">
//             <p className="text-gray-400">No stocks added yet</p>
//           </div>
//         ) : (
//           <div className="space-y-3">
//            {stocks.map((stock, i) => (
//   <StockCard
//     key={i}
//     stock={stock}
//     onRemove={() => removeStock(stock.symbol)}
//   />
// ))}
//           </div>
//         )}

//       </div>

//       <Footer />
//     </>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useRouter } from "next/navigation";
import StockCard from "../../components/StockCard";
import { useSession } from "next-auth/react";

export default function WatchlistPage() {
  const [stocks, setStocks] = useState([]);
  const router = useRouter();
  const { data: session } = useSession();

  const userId = session?.user?.email;

  useEffect(() => {
    if (!userId) return;

    fetch(`api/watchlist/${userId}`)
      .then(res => res.json())
      .then(data => setStocks(data.stocks || []));
  }, [userId]);

  const removeStock = async (symbol) => {
    await fetch("api/watchlist/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        symbol,
      }),
    });

    const res = await fetch(`api/watchlist/${userId}`);
    const data = await res.json();
    setStocks(data.stocks || []);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#020617] text-white px-6 py-24 max-w-5xl mx-auto mt-7">

        <h2 className="text-2xl font-semibold mb-6">Your Watchlist</h2>

        {!session ? (
          <div className="text-center p-10">
            <p>Please login to view your watchlist</p>
          </div>
        ) : !stocks || stocks.length === 0 ? (
          <div className="text-center border border-dashed border-white/20 p-10 rounded-xl">
            <p className="text-gray-400">No stocks added yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {stocks.map((stock, i) => (
              <StockCard
                key={i}
                stock={stock}
                onRemove={() => removeStock(stock.symbol)}
              />
            ))}
          </div>
        )}

      </div>

      <Footer />
    </>
  );
}