import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); 

const authenticate = (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);

    if (decoded) {
      console.log(decoded);

      req.user = decoded;

      next();
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authenticate;
