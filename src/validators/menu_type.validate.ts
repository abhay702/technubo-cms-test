import Joi from "joi";

export const menuTypeValidationSchema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string().optional(),
  is_active: Joi.boolean().optional(),
});
