import Joi from "joi";

const registerValidate = Joi.object({
  username: Joi.string().required().min(1).max(10).messages({
    "string.empty": "username Không được để trống",
    "any.required": "username là bắt buộc",
  }),
  email: Joi.string().email(),
  password: Joi.string().min(1).max(10).required(),
  role: Joi.string(),
});
const loginValidate = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(1).max(10),
});

export { registerValidate, loginValidate };
