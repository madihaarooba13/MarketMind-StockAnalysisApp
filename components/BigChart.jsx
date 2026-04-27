

// "use client";

// import { useEffect, useRef } from "react";
// // import { createChart } from "lightweight-charts";
// import { createChart } from "lightweight-charts";

// export default function BigChart({ data }) {
//   const chartRef = useRef();

//   useEffect(() => {
//     if (!chartRef.current || !data.length) return;

//    const chart = createChart(chartRef.current, {
//   layout: {
//     background: { color: "#020617" },
//     textColor: "#ccc",
//   },
//   grid: {
//     vertLines: { color: "rgba(255,255,255,0.03)" },
//     horzLines: { color: "rgba(255,255,255,0.03)" },
//   },

//   // 🔥 ADD THIS BLOCK
//   crosshair: {
//     mode: 1,
//     vertLine: {
//       color: "#6b7280",
//       width: 1,
//       style: 0,
//     },
//     horzLine: {
//       color: "#6b7280",
//       width: 1,
//       style: 0,
//     },
//   },

//   width: chartRef.current.clientWidth,
//   height: 250,
// });

// const lineSeries = chart.addLineSeries({
//   color: isUp ? "#4ade80" : "#ef4444",
//   lineWidth: 3,
//   priceLineVisible: true,   // 🔥 THIS
//   lastValueVisible: true,
// });

// // 🔥 ADD THIS JUST BELOW
// lineSeries.applyOptions({
//   lineColor: "#22c55e",
//   topColor: "rgba(34,197,94,0.4)",
//   bottomColor: "rgba(34,197,94,0.05)",
// });

//     lineSeries.setData(data);

//     return () => chart.remove();
//   }, [data]);

//   return <div ref={chartRef} className="w-full" />;
// }


"use client";

import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function BigChart({ data }) {
  const chartRef = useRef();

  useEffect(() => {
    if (!chartRef.current || !data?.length) return;

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 250,

      layout: {
        background: { color: "#020617" },
        textColor: "#ccc",
      },

      grid: {
        vertLines: { color: "rgba(255,255,255,0.03)" },
        horzLines: { color: "rgba(255,255,255,0.03)" },
      },

      // ✅ CROSSHAIR (interactive feel)
      crosshair: {
        mode: 1,
        vertLine: {
          color: "#6b7280",
          width: 1,
          style: 0,
        },
        horzLine: {
          color: "#6b7280",
          width: 1,
          style: 0,
        },
      },

      rightPriceScale: {
        borderColor: "rgba(255,255,255,0.1)",
      },

      timeScale: {
        borderColor: "rgba(255,255,255,0.1)",
      },
    });

    const isUp =
      data[data.length - 1]?.value >= data[0]?.value;
    // ✅ CLEAN LINE SERIES (NO WRONG OPTIONS)
    const lineSeries = chart.addAreaSeries({
      lineColor: isUp ? "#4ade80" : "#ef4444",

      topColor: isUp
        ? "rgba(74,222,128,0.4)"
        : "rgba(239,68,68,0.35)",

      bottomColor: isUp
        ? "rgba(74,222,128,0.02)"
        : "rgba(239,68,68,0.02)",

      lineWidth: 3,
      priceLineVisible: true,
      lastValueVisible: true,
    });

    // ✅ PRICE LINE STYLE (THIS IS YOUR “aisi line” 🔥)
    lineSeries.applyOptions({
      priceLineColor: isUp ? "#22c55e" : "#ef4444",
      priceLineStyle: 2, // dotted
      priceLineWidth: 1,
    });

    lineSeries.setData(data);

    const lastPoint = data[data.length - 1];

    if (lastPoint) {
      lineSeries.setMarkers([
        {
          time: lastPoint.time,
          position: "inBar",
          color: isUp ? "#4ade80" : "#ef4444",
          shape: "circle",
          size: 1,
        },
      ]);
    }
    setTimeout(() => {
      chart.timeScale().fitContent();
    }, 100);



    // ✅ FIT GRAPH PROPERLY
    chart.timeScale().fitContent();

    // ✅ RESPONSIVE
    const handleResize = () => {
      chart.applyOptions({
        width: chartRef.current.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data]);

  return <div ref={chartRef} className="w-full" />;
}