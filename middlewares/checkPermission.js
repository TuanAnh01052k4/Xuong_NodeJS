import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Auth from "../models/auth.js";
import { successMessages } from "../constants/message.js";
dotenv.config();
const { SECRET_CODE } = process.env;

const checkPermission = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Bạn chưa đăng nhập !!!",
      });
    }

    const decoded = jwt.verify(token, SECRET_CODE);
    const user = await Auth.findById(decoded._id);
    if (!user) {
      return res.status(403).json({
        message: successMessages.TOKEN_INVALID,
      });
    }
    if (user.role !== "admin") {
      return res.status(400).json({
        message: successMessages.PERMISSION_DENIED,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ name: error.name, message: error.message });
  }
};

export { checkPermission };
