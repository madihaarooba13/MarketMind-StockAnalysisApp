import { connectDB } from "@/lib/db";
import Watchlist from "@/models/Watchlist";

export async function POST(req) {
  await connectDB();

  const { userId, symbol } = await req.json();

  const wl = await Watchlist.findOne({ userId });

  if (wl) {
    wl.stocks = wl.stocks.filter(s => s.symbol !== symbol);
    await wl.save();
  }

  return Response.json(wl);
}