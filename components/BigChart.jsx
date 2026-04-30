"use client";

import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function BigChart({ data, color }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data || data.length === 0) return;

    // ✅ CLEAN DATA
    const cleanData = data.filter(
      (d) =>
        d &&
        d.time !== undefined &&
        d.value !== undefined &&
        !isNaN(d.value)
    );

    if (cleanData.length < 2) return;

    // ✅ COLOR FROM PARENT (SOURCE OF TRUTH)
    const lineColor = color || "#22c55e";

    const isGreen = lineColor === "#22c55e";

    const topColor = isGreen
      ? "rgba(34,197,94,0.4)"
      : "rgba(239,68,68,0.35)";

    const bottomColor = isGreen
      ? "rgba(34,197,94,0.02)"
      : "rgba(239,68,68,0.02)";

    // 🔥 CREATE CHART
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

      crosshair: {
        mode: 1,
        vertLine: { color: "#6b7280", width: 1 },
        horzLine: { color: "#6b7280", width: 1 },
      },

      rightPriceScale: {
        borderColor: "rgba(255,255,255,0.1)",
      },

      timeScale: {
        borderColor: "rgba(255,255,255,0.1)",
      },
    });

    // 🔥 AREA SERIES
    const series = chart.addAreaSeries({
      lineColor: lineColor,
      topColor: topColor,
      bottomColor: bottomColor,
      lineWidth: 3,
      priceLineVisible: true,
      lastValueVisible: true,
    });

    // ✅ SET DATA
    series.setData(cleanData);

    // ✅ PRICE LINE
    series.applyOptions({
      priceLineColor: lineColor,
      priceLineWidth: 1,
      priceLineStyle: 2,
    });

    // ✅ LAST POINT MARKER
    const lastPoint = cleanData[cleanData.length - 1];
    if (lastPoint) {
      series.setMarkers([
        {
          time: lastPoint.time,
          position: "inBar",
          color: lineColor,
          shape: "circle",
          size: 1,
        },
      ]);
    }

    chart.timeScale().fitContent();

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
  }, [data, color]);

  return <div ref={chartRef} className="w-full" />;
}