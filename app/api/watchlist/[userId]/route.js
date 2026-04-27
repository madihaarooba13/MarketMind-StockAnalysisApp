import { connectDB } from "@/lib/db";
import Watchlist from "@/models/Watchlist";

export async function GET(req, { params }) {
  await connectDB();

  const { userId } = await params;  // 👈 FIX

  const data = await Watchlist.findOne({ userId });

  return Response.json(data || { stocks: [] });
}