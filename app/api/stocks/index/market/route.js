export const dynamic = "force-dynamic";
export const revalidate = 0;

// 🔥 SIMPLE MEMORY CACHE
let cachedData = null;
let lastFetchTime = 0;

async function getMarketData() {
  const symbols = [
    { name: "NIFTY 50", symbol: "^NSEI" },
    { name: "SENSEX", symbol: "^BSESN" },
  ];

  const results = await Promise.all(
    symbols.map(async (item) => {
      const res = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
          item.symbol
        )}?interval=1m&range=1d`,
        {
          headers: { "User-Agent": "Mozilla/5.0" },
          cache: "no-store",
        }
      );

      const data = await res.json();
      if (!data.chart?.result?.[0]) return null;

      const result = data.chart.result[0];
      const meta = result.meta;
      const quote = result.indicators?.quote?.[0] || {};

      // 📊 CHART DATA
      const timestamps = result.timestamp || [];
      const closes = quote.close || [];

      const chart = closes
        .map((price, i) => {
          if (price == null) return null;
          return {
            time: timestamps[i],
            value: Number(price.toFixed(2)),
          };
        })
        .filter(Boolean);

      // 💰 PRICE (consistent with chart)
      const lastPoint = chart[chart.length - 1];
      const price =
        lastPoint?.value || meta.regularMarketPrice || 0;

      const prevClose = meta.previousClose || price;

      const change =
        prevClose === 0
          ? 0
          : ((price - prevClose) / prevClose) * 100;

      // 🔥 OPEN / HIGH / LOW (real fix)
      const open =
        meta.regularMarketOpen ||
        quote.open?.find((v) => v != null) ||
        prevClose;

      const high =
        meta.regularMarketDayHigh ||
        Math.max(...closes.filter(Boolean));

      const low =
        meta.regularMarketDayLow ||
        Math.min(...closes.filter(Boolean));

      return {
        name: item.name,
        price: Number(price.toFixed(2)),
        change: Number(change.toFixed(2)),
        sentiment: change >= 0 ? "Bullish" : "Bearish",

        open: Number(open.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),

        chart,
      };
    })
  );

  return results.filter(Boolean);
}

export async function GET() {
  try {
    const now = Date.now();

    // ⏱ 10 sec cache (SAME DATA EVERYWHERE)
    if (cachedData && now - lastFetchTime < 10000) {
      return Response.json(cachedData);
    }

    const freshData = await getMarketData();

    cachedData = freshData;
    lastFetchTime = now;

    return Response.json(freshData);
  } catch (err) {
    console.error("MARKET API ERROR:", err);
    return Response.json([]);
  }
}