

// "use client";

// import { useEffect, useRef, memo } from "react";
// // import { createChart, LineSeries } from "lightweight-charts";
// import { createChart } from "lightweight-charts";

// function StockChart({ data }) {
//   const chartContainerRef = useRef(null);
//   const chartRef = useRef(null);
//   const seriesRef = useRef(null);



// useEffect(() => {
//   const chart = createChart(chartContainerRef.current, {
//     width: chartContainerRef.current.clientWidth,
//     height: 300,
//     layout: {
//       background: { color: "#020617" },
//       textColor: "#ffffff",
//     },
//     grid: {
//       vertLines: { color: "#1f2937" },
//       horzLines: { color: "#1f2937" },
//     },
//     crosshair: {
//       mode: 1,
//     },
//   });

//   // const lineSeries = chart.addSeries(LineSeries, {
//   //   color: "#3b82f6",
//   //   lineWidth: 2,
//   // });

//   const lineSeries = chart.addLineSeries({
//   color: "#3b82f6",
//   lineWidth: 2,
// });

//   chartRef.current = chart;
//   seriesRef.current = lineSeries;

//   // 🔥 TOOLTIP START
//   const tooltip = document.createElement("div");
//   tooltip.style.position = "absolute";
//   tooltip.style.background = "#111";
//   tooltip.style.padding = "6px 10px";
//   tooltip.style.borderRadius = "6px";
//   tooltip.style.color = "#fff";
//   tooltip.style.fontSize = "12px";
//   tooltip.style.transition = "all 0.1s ease";

//   chartContainerRef.current.appendChild(tooltip);

//   chart.subscribeCrosshairMove((param) => {
//     if (!param.time || !param.seriesPrices) {
//       tooltip.style.transition = "all 0.1s ease";
//       return;
//     }

//     const price = param.seriesPrices.get(lineSeries);

//     if (!price) return;

//     tooltip.innerHTML = `₹ ${price.toFixed(2)}`;
//     tooltip.style.display = "block";
//     tooltip.style.left = param.point.x + 20 + "px";
//     tooltip.style.top = param.point.y + "px";
//   });
//   // 🔥 TOOLTIP END

//   const handleResize = () => {
//     chart.applyOptions({
//       width: chartContainerRef.current.clientWidth,
//     });
//   };

//   window.addEventListener("resize", handleResize);

//   return () => {
//     window.removeEventListener("resize", handleResize);
//     chart.remove();
//   };
// }, []);

//   // ✅ UPDATE DATA (LIGHT)
//  useEffect(() => {
//   if (!seriesRef.current || !data) return;

//   // const cleanData = data.filter(
//   //   (item) => item && item.time && item.value
//   // );

//   const cleanData = data.filter(
//   (item) =>
//     item &&
//     item.time !== undefined &&
//     item.value !== undefined
// );

//   const limited = cleanData.slice(-30);

//   seriesRef.current.setData(limited);

//   // ✅ THIS MAKES IT FEEL ALIVE
//   if (limited.length > 0) {
//   chartRef.current.timeScale().fitContent();
// }

// }, [data]);

//   return <div ref={chartContainerRef} className="w-full mt-6" />;
// }

// export default memo(StockChart);


"use client";

import { useEffect, useRef, memo } from "react";
import { createChart } from "lightweight-charts";

function StockChart({ data }) {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    // 🔥 CREATE CHART
    const chart = createChart(container, {
      width: container.clientWidth || 400,
      height: 300,
      layout: {
        background: { color: "#020617" },
        textColor: "#ffffff",
      },
      grid: {
        vertLines: { color: "#1f2937" },
        horzLines: { color: "#1f2937" },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: "#444",
          width: 1,
        },
        horzLine: {
          color: "#444",
          width: 1,
        },
      },
      rightPriceScale: {
        borderColor: "#374151",
      },
      timeScale: {
        borderColor: "#374151",
      },
    });

    // 🔥 LINE SERIES (UPDATED API)
    const lineSeries = chart.addLineSeries({
      color: "#22c55e",
      lineWidth: 3,
      priceLineVisible: true,
      lastValueVisible: true,
    });

    // 🔥 ADD THIS JUST BELOW
    lineSeries.applyOptions({
      lineColor: "#22c55e",
      topColor: "rgba(34,197,94,0.4)",
      bottomColor: "rgba(34,197,94,0.05)",
    });

    chartRef.current = chart;
    seriesRef.current = lineSeries;

    // 🔥 TOOLTIP
    const tooltip = document.createElement("div");
    tooltip.style.position = "absolute";
    tooltip.style.background = "#111";
    tooltip.style.padding = "6px 10px";
    tooltip.style.borderRadius = "6px";
    tooltip.style.color = "#fff";
    tooltip.style.fontSize = "12px";
    tooltip.style.transition = "all 0.1s ease";
    tooltip.style.pointerEvents = "none";

    container.appendChild(tooltip);

    chart.subscribeCrosshairMove((param) => {
      if (!param || !param.seriesPrices) {
        tooltip.style.transition = "all 0.1s ease";
        return;
      }

      const price = param.seriesPrices.get(lineSeries);
      if (!price || !param.point) return;

      tooltip.innerHTML = `₹ ${price.toFixed(2)}`;
      tooltip.style.display = "block";

      const left = Math.min(
        param.point.x + 20,
        container.clientWidth - 100
      );

      tooltip.style.left = left + "px";
      tooltip.style.top = param.point.y + "px";
    });

    // 🔥 RESIZE FIX
    const handleResize = () => {
      chart.applyOptions({
        width: container.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
      tooltip.remove(); // 🔥 IMPORTANT
    };
  }, []);

  // 🔥 DATA UPDATE
  useEffect(() => {
    if (!seriesRef.current || !data) return;

    const cleanData = data
      .filter(
        (item) =>
          item &&
          item.time !== undefined &&
          item.value !== undefined
      )
      .slice(-50);

    seriesRef.current.setData(cleanData);

    if (cleanData.length > 0) {
      chartRef.current.timeScale().fitContent();
    }
  }, [data]);

  return <div ref={chartContainerRef} className="w-full mt-6" />;
}

export default memo(StockChart);