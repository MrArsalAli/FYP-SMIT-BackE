import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
