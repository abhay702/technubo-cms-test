import Joi from "joi";

export const languageValidator = Joi.object({
  name: Joi.string().required(),
  extras: Joi.object().optional(),
});
