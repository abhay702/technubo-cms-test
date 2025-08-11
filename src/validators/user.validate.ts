import Joi from "joi";

export const userValidator = {
  signUp: Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .messages({ "string.email": "Invalid email format" })
      .required(),
    password: Joi.string().min(8).required().messages({
      "string.min": "Password must be at least 8 characters long",
      "any.required": "Password is required",
    }),
    role_id: Joi.string()
      .required()
      .regex(/^[a-f\d]{24}$/i)
      .messages({
        "string.pattern.base": "Invalid verification ID format",
        "any.required": "Verification ID is required",
      }),
    extras: Joi.object().optional(),
  }),
  editUser: Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .messages({ "string.email": "Invalid email format" })
      .required(),
    role_id: Joi.string()
      .required()
      .regex(/^[a-f\d]{24}$/i)
      .messages({
        "string.pattern.base": "Invalid verification ID format",
        "any.required": "Verification ID is required",
      }),
    extras: Joi.object().optional(),
  }),
};
