// "use client";

// export default function Sparkline({ data, large = false }) {
//   if (!data || data.length === 0) return null;

//   const values = data.map(d => d.value);

//   const max = Math.max(...values);
//   const min = Math.min(...values);

//   const points = values
//     .map((v, i) => {
//       const x = (i / (values.length - 1)) * 100;
//       const y = 100 - ((v - min) / (max - min || 1)) * 100;
//       return `${x},${y}`;
//     })
//     .join(" ");

//   // 🔥 AREA FILL (THIS IS THE MAGIC)
//   const areaPoints = `
//     0,100 
//     ${points} 
//     100,100
//   `;

//   return (
//     <svg
//       viewBox="0 0 100 100"
//       className={`${large ? "w-full h-40" : "w-20 h-10"}`}
//     >
//       {/* 🔥 gradient */}
//       <defs>
//         <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
//           <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
//         </linearGradient>
//       </defs>

//       {/* 🔥 AREA */}
//       {large && (
//         <polygon fill="url(#gradient)" points={areaPoints} />
//       )}

//       {/* 🔥 LINE */}
//       <polyline
//         fill="none"
//         stroke="currentColor"
//         strokeWidth={large ? "2.5" : "2"}
//         points={points}
//       />
//     </svg>
//   );
// }

"use client";

import { useEffect, useState } from "react";

export default function Sparkline({ data, large = false }) {
  const [fakeData, setFakeData] = useState([]);

  useEffect(() => {
    if (!data || data.length === 0) {
      // 🔥 generate fake moving data
      let base = 100;
      const generated = Array.from({ length: 20 }, () => {
        base += Math.random() * 5 - 2;
        return { value: base };
      });
      setFakeData(generated);
    }
  }, [data]);

  const finalData = (data && data.length > 0) ? data : fakeData;

  if (!finalData.length) return null;

  const values = finalData.map(d =>
    typeof d === "number" ? d : d.value
  );

  const max = Math.max(...values);
  const min = Math.min(...values);

  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * 100;
      const y = 100 - ((v - min) / (max - min || 1)) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <svg
      viewBox="0 0 100 100"
      className={`${large ? "w-full h-40" : "w-20 h-10"} animate-pulse`}
    >
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      <polygon fill="url(#gradient)" points={areaPoints} />

      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        points={points}
      />
    </svg>
  );
}