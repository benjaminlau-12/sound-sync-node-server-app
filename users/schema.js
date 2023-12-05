import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    //   _id: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: {
      type: String,
      default: "USER",
      enum: ["ADMIN", "USER"],
    },
    dosu: { type: Date, default: Date.now },
  },
  { collection: "users" }
);

export default schema;
