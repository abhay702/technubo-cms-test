import Joi from "joi";

export const roleValidator = Joi.object({
  name: Joi.string().required(),
});
