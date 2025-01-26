import express from "express";
import "dotenv/config";
import sendResponse from "../helpers/sendResponse.js";
import Requests from "../models/Requests.js";
import { signupUser } from "../utils/AutoSignupUser.js";
import { sendMail } from "../utils/SendMail.js";

const requestRoutes = express.Router();

requestRoutes.post("/addrequest", async (req, res) => {
  try {
    const { cnic, email, password, name, category, loan, initialdeposit } =
      req.body;
    let newRequest = new Requests({
      cnic,
      email,
      password,
      name,
      category,
      loan,
      initialdeposit,
    });
    newRequest = await newRequest.save();
    signupUser(name, email, password);
    sendMail(email, name, password)
    sendResponse(res, 200, newRequest, false, "Request Added Successfully");
  } catch (error) {
    sendResponse(res, 400, null, true, error.message);
  }
});


requestRoutes.get("/getAllRequests", async(req, res) => {
  try {
    const allRequests = await Requests.find()
    sendResponse(res, 200, allRequests, false, "Requests Fetched Successfully")
  } catch (error) {
    sendResponse(res, 400, null, true, "Error fetching Requests")
  }
})

export default requestRoutes;
