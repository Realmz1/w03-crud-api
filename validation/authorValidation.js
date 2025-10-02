import Joi from "joi";

export const authorSchema = Joi.object({
  name: Joi.string().min(2).required(),
  birthYear: Joi.number().integer().min(1800).max(new Date().getFullYear()),
  nationality: Joi.string().required(),
  alive: Joi.boolean(),
  awards: Joi.array().items(Joi.string()).default([]),
  bio: Joi.string().optional(),
  website: Joi.string().uri().optional()
});
