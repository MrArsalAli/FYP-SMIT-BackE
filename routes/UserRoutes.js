import express from "express";
import "dotenv/config";
import Joi from "joi";
import bcrypt from "bcrypt";
import sendResponse from "../helpers/sendResponse.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import authenticate from "../middlewares/authentication.js";

const userRoutes = express.Router();

const signupSchema = Joi.object({
  image: Joi.string().required(),
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().min(6).required(),
});

// signup
userRoutes.post("/signup", async (req, res) => {
  try {
    const { error, value } = signupSchema.validate(req.body);
    if (error) return sendResponse(res, 404, null, true, error.message);
    const user = await User.findOne({ email: value.email });
    if (user) return sendResponse(res, 400, null, true, "Email Taken Already");
    const hashpass = await bcrypt.hash(value.password, 12);
    value.password = hashpass;
    let newUser = new User({ ...value });
    newUser = await newUser.save();
    sendResponse(res, 200, newUser, false, "User Registered Successfully");
  } catch (error) {
    sendResponse(res, 404, null, true, error.message);
  }
});

// login
userRoutes.post("/login", async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return sendResponse(res, 404, null, true, error.message);
    const user = await User.findOne({ email: value.email }).lean();
    if (!user) return sendResponse(res, 404, null, true, "Unregistered User");
    const isPassValid = await bcrypt.compare(value.password, user.password);
    if (!isPassValid)
      return sendResponse(res, 403, null, true, "Invalid Credentials");
    var token = jwt.sign(user, process.env.AUTH_SECRET);
    sendResponse(res, 200, { user, token }, false, "Login Successfull");
  } catch (error) {
    sendResponse(res, 404, null, true, error.message);
  }
});

// current user
userRoutes.get("/currentUser", authenticate, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    sendResponse(res, 200, currentUser, false, "User Fetched Successfully");
  } catch (error) {
    sendResponse(res, 404, null, true, error.message);
  }
});

userRoutes.get("/getAllUsers", async (req, res) => {
  try {
    const allUsers = await User.find()
    sendResponse(res, 201, allUsers, false, "Users Fetched Successfully")
  } catch (error) {
    sendResponse(res, 201, null, false, "Error Fetching Users")
  }
})

export default userRoutes;
