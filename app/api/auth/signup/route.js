import mongoose from "mongoose";
import User from "../../../../models/User";

export async function POST(req) {
  const body = await req.json();

  await mongoose.connect(process.env.MONGO_URI);

  const userExists = await User.findOne({ email: body.email });

  if (userExists) {
    return Response.json({ message: "User already exists" });
  }

  const user = await User.create({
    name: body.name,
    email: body.email,
    password: body.password,
  });

  return Response.json(user);
}