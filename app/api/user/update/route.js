import { NextResponse } from "next/server";
// import connectDB from "@/server/config/db";
import User from "@/models/User";
// import connectDB from "@/lib/db"; 
import { connectDB } from "@/lib/db";
export async function POST(req) {
  try {
    const body = await req.json();

    const {
      email,
      name,
      gender,
      dob,
      location,
      mobile,
      bio,
      preferences,
    } = body;

    await connectDB();

    const user = await User.findOneAndUpdate(
      { email },
      {
        name,
        gender,
        dob: dob ? new Date(dob) : null,
        location,
        mobile,
        bio,
        preferences,
      },
      {
        new: true,
        upsert: true, // 🔥 VERY IMPORTANT
      }
    );

    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error("ERROR:", err);
    return NextResponse.json({ success: false });
  }
}