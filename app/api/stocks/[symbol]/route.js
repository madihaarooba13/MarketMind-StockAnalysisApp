export async function GET(req, { params }) {
  const { symbol } = await params;

  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`
    );

    const data = await res.json();

    const price =
      data.chart.result[0].meta.regularMarketPrice;

    return Response.json({ price });
  } catch (err) {
    return Response.json({ error: "Failed" });
  }
}