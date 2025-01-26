import express from "express";
import mongoose from "mongoose";
import sendResponse from "./helpers/sendResponse.js";
import "dotenv/config";
import cors from "cors";
import userRoutes from "./routes/UserRoutes.js";
import requestRoutes from "./routes/RequestRoutes.js";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODBURI)
  .then(() => console.log("mongoDB connected"))
  .catch((err) => console.log(err.message));

app.get("/", (req, res) => {
  sendResponse(res, 200, null, false, "GET API is Working");
});
app.post("/", (req, res) => {
  sendResponse(res, 200, null, false, "POST API is Working");
});
app.put("/", (req, res) => {
  sendResponse(res, 200, null, false, "PUT API is Working");
});
app.delete("/", (req, res) => {
  sendResponse(res, 200, null, false, "DELETE API is Working");
});

app.use("/user", userRoutes);
app.use("/requests", requestRoutes)

app.listen(PORT, () => console.log("Server Running on " + PORT));
