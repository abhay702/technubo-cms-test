import Joi from "joi";

export const regionValidator = Joi.object({
  name: Joi.string().required(),
  code: Joi.string().required(),
  extras: Joi.object().optional(),
});
