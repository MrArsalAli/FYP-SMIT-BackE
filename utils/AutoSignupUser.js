import bcrypt from "bcrypt";
import User from "../models/User.js";

export const signupUser = async (name, email, password) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists!");
      return existingUser; // Return the existing user
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to MongoDB
    await newUser.save();

    console.log("New user created:", newUser);
    return newUser; // Return the newly created user
  } catch (error) {
    console.error("Error during signup:", error.message);
    throw error;
  }
};
