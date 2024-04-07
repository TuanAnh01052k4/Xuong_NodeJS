import Auth from "../models/auth.js";
import { registerValidate, loginValidate } from "../validate/auth.js";
import bcryptjs from "bcryptjs";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { successMessages } from "../constants/message.js";
dotenv.config();
const { SECRET_CODE } = process.env;
class AuthController {
  async login(req, res) {
    try {
      const { error } = loginValidate.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ message: errors });
      }
      const user = await Auth.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({
          message: "email này chưa được đăng ký, bạn có muốn đăng ký không ?",
        });
      }
      const isMatch = await bcryptjs.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: successMessages.INVALID_PASSWORD,
        });
      }
      const accessToken = await Jwt.sign({ _id: user._id }, SECRET_CODE);
      console.log(accessToken);
      user.password = undefined;
      return res.status(200).json({
        message: successMessages.LOGIN_SUCCESS,
        user,
        accessToken,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async register(req, res) {
    try {
      const { error } = registerValidate.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ message: errors });
      }
      const userExists = await Auth.findOne({ email: req.body.email });
      if (userExists) {
        return res.status(400).json({ message: successMessages.EMAIL_EXISTED });
      }
      const hashedPassword = await bcryptjs.hash(req.body.password, 10);

      const user = await Auth.create({
        ...req.body,
        password: hashedPassword,
      });
      user.password = undefined;
      return res.status(200).json({
        message: successMessages.REGISTER_SUCCESS,
        user,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default AuthController;
