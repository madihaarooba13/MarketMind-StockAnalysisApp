"use client";

import { useEffect, useRef, memo } from "react";
import { createChart } from "lightweight-charts";

function StockChart({ data }) {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const isChartReady = useRef(false);

  // 🔥 CREATE CHART
  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

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
      rightPriceScale: {
        borderColor: "#374151",
      },
      timeScale: {
        borderColor: "#374151",
      },
    });

    const lineSeries = chart.addLineSeries({
      lineWidth: 3,
      priceLineVisible: true,
      lastValueVisible: true,
    });

    chartRef.current = chart;
    seriesRef.current = lineSeries;
    isChartReady.current = true;

    const handleResize = () => {
      chart.applyOptions({
        width: container.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  // 🔥 DATA + COLOR UPDATE
  useEffect(() => {
    if (!isChartReady.current || !seriesRef.current || !chartRef.current || !data) return;

    const cleanData = data
      .filter(
        (item) =>
          item &&
          item.time !== undefined &&
          item.value !== undefined
      )
      .slice(-50);

    if (cleanData.length < 2) return;

    // ✅ CORRECT TREND LOGIC (FULL RANGE)
    const first = cleanData[0].value;
    const last = cleanData[cleanData.length - 1].value;

    const isUp = last >= first;

    const color = isUp ? "#22c55e" : "#ef4444";

    // ✅ SET DATA
    seriesRef.current.setData(cleanData);

    // ✅ APPLY COLOR
    seriesRef.current.applyOptions({
      color: color,
    });

    chartRef.current.timeScale().fitContent();
  }, [data]);

  return <div ref={chartContainerRef} className="w-full mt-6" />;
}

export default memo(StockChart);