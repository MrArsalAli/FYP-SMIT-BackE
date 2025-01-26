import mongoose from "mongoose";
const { Schema } = mongoose;

const requestSchema = new Schema(
  {
    cnic: { type: Number },
    email: { type: String },
    password: { type: String },
    name: { type: String },
    category: { type: String },
    loan: { type: Number },
    initialdeposit: { type: Number },
    // monthlyinstallment: { type: Number },
  },
  { timestamps: true }
);

const Requests =
  mongoose.models.requests || mongoose.model("requests", requestSchema);

export default Requests;
