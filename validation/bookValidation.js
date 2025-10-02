import Joi from "joi";

export const bookSchema = Joi.object({
  title: Joi.string().min(2).required(),
  authorId: Joi.string().required(),
  publishedYear: Joi.number().integer().min(1450).max(new Date().getFullYear()),
  genre: Joi.string().required(),
  pages: Joi.number().integer().min(1),
  price: Joi.number().min(0),
  inStock: Joi.boolean()
});
