export const dynamic = "force-dynamic";

function formatSymbol(sym) {
  if (!sym) return "AAPL";
  const s = sym.toUpperCase();

  if (["AAPL","TSLA","MSFT","AMZN","GOOGL","NVDA","META"].includes(s)) {
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
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1mo&interval=15m`,
      {
        headers: { "User-Agent": "Mozilla/5.0" },
        cache: "no-store",
      }
    );

    const data = await res.json();

    const result = data.chart?.result?.[0];
    if (!result) return Response.json([]);

    const timestamps = result.timestamp || [];
    const closes = result.indicators?.quote?.[0]?.close || [];

    const chart = closes
      .map((price, i) => {
        if (price == null || price === 0) return null;
        return {
          time: timestamps[i],
          value: Number(price.toFixed(2)), // 👈 smoothing
        };
      })
      .filter(Boolean);

    return Response.json(chart);
  } catch (err) {
    console.error(err);
    return Response.json([]);
  }
}