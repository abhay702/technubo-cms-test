import Joi from "joi";

export const menuValidationSchema = Joi.object({
  name: Joi.string().required(),
  region: Joi.string().optional().allow("", null),
  lang: Joi.string().required(),
  page_id: Joi.string().hex().length(24).optional(),
  menu_id: Joi.string().hex().length(24).allow(null, "").optional(),
  menu_type: Joi.string().required(),
  is_active: Joi.boolean().optional(),
  redirect_to: Joi.string().optional().allow("", null),
});
