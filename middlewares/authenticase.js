import Jwt from "jsonwebtoken";
import { Auth } from "../models/auth.js";
import { successMessages } from "../constants/message.js";

const checkPermission = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No Authorization" });
    }
    const data = Jwt.verify(token, process, env.SECRET_CODE); //process.env.JWT_KEY
    if (!data) {
      return res.status(401).json({ message: "No Authorization" });
    }
    const user = await Auth.findById(data.id);
    if (!user) {
      return res.status(404).json({ message: successMessages.NOT_FOUND });
    }
    next();
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export { checkPermission };
