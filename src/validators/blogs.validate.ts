import Joi from "joi";

export const blogValidator = {
  create: Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    desc: Joi.string().optional().allow("", null),
    slug: Joi.string().required(),
    locale: Joi.string().optional().allow("", null),
    extras: Joi.object().optional(),
    image: Joi.string().optional().allow("", null),
  }),
};
