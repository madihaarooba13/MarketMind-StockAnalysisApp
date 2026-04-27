// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";

// export default function SearchBar() {
//   const [query, setQuery] = useState("");
//   const [price, setPrice] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async () => {
//     if (!query) return;

//     setLoading(true);

//     try {
//       const res = await fetch(`http://localhost:5000/api/stocks/${query}`);
//       const data = await res.json();

//       setPrice(data.price);
//     } catch (err) {
//       console.log(err);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="flex flex-col items-center">

//       {/* Input */}
//       <motion.div
//         whileFocus={{ scale: 1.05 }}
//         className="flex bg-white/10 backdrop-blur-md rounded-full p-2 shadow-lg"
//       >
//         <input
//           type="text"
//           placeholder="Search stock (AAPL)"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="bg-transparent outline-none px-4 py-2 text-white"
//         />

//         <button
//           onClick={handleSearch}
//           className="bg-green-500 px-5 py-2 rounded-full hover:bg-green-600 transition"
//         >
//           Search
//         </button>
//       </motion.div>

//       {/* Loader */}
//       {loading && <p className="mt-4 text-gray-300">Loading...</p>}

//       {/* Result */}
//       {price && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mt-6 bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg"
//         >
//           <h2 className="text-xl font-bold">{query.toUpperCase()}</h2>
//           <p className="text-green-400 text-lg mt-2">Price: {price}</p>
//         </motion.div>
//       )}
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query) return;
    onSearch(query.toUpperCase());
  };

  return (
    <div className="flex items-center">

      <motion.div
        whileFocus={{ scale: 1.05 }}
        className="flex bg-white/10 backdrop-blur-md rounded-full p-2 shadow-lg"
      >
        <input
          type="text"
          placeholder="Search AAPL, TSLA..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent outline-none px-4 py-2 text-white"
        />

        <button
          onClick={handleSearch}
          className="bg-green-500 px-5 py-2 rounded-full hover:bg-green-600 transition"
        >
          Search
        </button>
      </motion.div>

    </div>
  );
}