import Joi from "joi";

export const directoryValidationSchema = Joi.object({
  name: Joi.string().allow(null).optional(),
  parent_id: Joi.string().hex().length(24).allow(null, "").optional(),
  is_active: Joi.boolean().optional(),
});
