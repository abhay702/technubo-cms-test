import Joi from "joi";

export const sectionTypeValidator = Joi.object({
  type: Joi.string().required(),
  label: Joi.string().required(),
  fields: Joi.array()
    .items(
      Joi.object({
        key: Joi.string().required(),
        type: Joi.string().required(),
        label: Joi.string().required(),
        required: Joi.boolean().optional(),
        fields: Joi.array().optional(),
      })
    )
    .min(1)
    .required(),
  extras: Joi.object().optional(),
});
