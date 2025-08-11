import Joi from "joi";

export const pageValidator = {
  create: Joi.object({
    title: Joi.string().required(),
    slug: Joi.string().required(),
    locale: Joi.string().optional(),
    sections: Joi.array()
      // .items(Joi.string().hex().length(24).required())
      .min(1)
      .required(),
    seo: Joi.object({
      metaTitle: Joi.string().required(),
      metaDesc: Joi.string().optional(),
      metaImage: Joi.string().optional(),
    }).optional(),
    translations: Joi.object().optional(),
    published: Joi.boolean().optional(),
    extras: Joi.object().optional(),
  }),
  publishStatus: Joi.object({
    published: Joi.boolean().required(),
  }),
};
