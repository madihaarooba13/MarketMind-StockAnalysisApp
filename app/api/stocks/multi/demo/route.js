export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const symbols = [
      // 🔹 Top 8 (Trending)
      "AAPL",
      "TSLA",
      "MSFT",
      "AMZN",
      "GOOGL",
      "NVDA",
      "META",
      "NFLX",

      // 🔹 Rest (Market section)
      "INTC",
      "AMD",
      "TCS.NS",
      "RELIANCE.NS",
      "INFY.NS",
      "HDFCBANK.NS",
      "ICICIBANK.NS",
      "SBIN.NS",
      "WIPRO.NS",
      "BAJFINANCE.NS",
    ];

    const fetchStock = async (symbol) => {
      const res = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`,
        {
          headers: { "User-Agent": "Mozilla/5.0" },
          cache: "no-store",
        }
      );

      const data = await res.json();
      const result = data.chart?.result?.[0];

      if (!result) return null;

      const meta = result.meta;

      const price = meta.regularMarketPrice || 0;
      const prevClose = meta.previousClose || 0;

      const change =
        prevClose === 0
          ? "0"
          : (((price - prevClose) / prevClose) * 100).toFixed(2);

      return {
        symbol,
        price: Number(price.toFixed(2)),
        change,
      };
    };

    const results = (await Promise.all(symbols.map(fetchStock))).filter(Boolean);

    return Response.json(results); // ✅ ARRAY ONLY
  } catch (err) {
    console.error("MULTI API ERROR:", err);
    return Response.json([]);
  }
}