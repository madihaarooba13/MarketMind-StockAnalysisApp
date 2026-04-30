export async function GET(req, { params }) {
  try {
    const { symbol } = await params;
    const formatted = symbol.toUpperCase();
    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range") || "1mo";
    
    // ✅ FIX: 1mo range ke liye interval '1d' rakhein taaki axis saaf ho jaye
    const interval = range === "1mo" ? "1d" : "15m";

    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${formatted}?range=${range}&interval=${interval}`,
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

    const chart = timestamps.map((time, i) => {
      const price = closes[i];
      if (price == null || price === 0) return null;
      return {
        time: time, 
        value: Number(price.toFixed(2)),
      };
    }).filter(Boolean);

    return Response.json(chart);

  } catch (err) {
    return Response.json([]);
  }
}