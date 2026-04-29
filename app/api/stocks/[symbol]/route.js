export const dynamic = "force-dynamic";

function formatSymbol(sym) {
  if (!sym) return "AAPL";

  const s = sym.toUpperCase();

  if (["AAPL","TSLA","MSFT","AMZN","GOOGL","NVDA","META","NFLX"].includes(s)) {
    return s;
  }

  if (!s.includes(".NS")) return `${s}.NS`;

  return s;
}

export async function GET(req, context) {
  try {
    const { symbol: raw } = await context.params;
    const symbol = formatSymbol(raw);

    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1d&interval=5m`,
      {
        headers: { "User-Agent": "Mozilla/5.0" },
        cache: "no-store",
      }
    );

    const data = await res.json();

    const result = data.chart?.result?.[0];
    if (!result) return Response.json({});

    const meta = result.meta;
    const quote = result.indicators?.quote?.[0];

    const closes = quote?.close || [];
    const opens = quote?.open || [];

    // 🔥 SMART FALLBACKS
    const openPrice =
      meta.regularMarketOpen ||
      opens.find(v => v != null && v !== 0) ||
      closes.find(v => v != null && v !== 0) ||
      0;

    const highPrice =
      meta.regularMarketDayHigh ||
      Math.max(...closes.filter(v => v != null)) ||
      0;

    const lowPrice =
      meta.regularMarketDayLow ||
      Math.min(...closes.filter(v => v != null)) ||
      0;

    const price = meta.regularMarketPrice || closes.at(-1) || 0;
    const prevClose = meta.previousClose || 0;

    const change =
      prevClose === 0
        ? "0"
        : (((price - prevClose) / prevClose) * 100).toFixed(2);

    return Response.json({
      price: Number(price.toFixed(2)),
      open: Number(openPrice.toFixed(2)),
      high: Number(highPrice.toFixed(2)),
      low: Number(lowPrice.toFixed(2)),
      prevClose: Number(prevClose.toFixed(2)),
      change,
    });

  } catch (err) {
    console.error("STOCK API ERROR:", err);
    return Response.json({});
  }
}