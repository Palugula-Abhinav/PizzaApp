import mongoose from "mongoose";
import { User } from "@/models/user";
import bcrypt from "bcrypt";

const postHandler = async (req) => {
  try {
    let body = await req.json();
    body.password = await bcrypt.hash(body.password, 3);
    mongoose.connect(process.env.ConnectionString, {
      dbName: "FoodApp",
    });
    let createdUser = await User.create([body]);
    return Response.json({
      status: "success",
      createdUser,
    });
  } catch (error) {
    return Response.json({ status: "error", error });
  }
};

export { postHandler as POST };
