import { connectDB } from "@/lib/db";
import Watchlist from "@/models/Watchlist";

export async function POST(req) {
  await connectDB();

  const { userId, stock } = await req.json();

  let wl = await Watchlist.findOne({ userId });

  if (!wl) {
    wl = new Watchlist({ userId, stocks: [stock] });
  } else {
    const exists = wl.stocks.find(s => s.symbol === stock.symbol);
    if (!exists) wl.stocks.push(stock);
  }

  await wl.save();

  return Response.json(wl);
}