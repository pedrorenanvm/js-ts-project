import { Joi, Segments } from "celebrate";

export const listCarsValidationSchema = {
  [Segments.QUERY]: Joi.object({
    status: Joi.string().valid("ativo", "inativo").optional(),
    licensePlateEnd: Joi.string().optional(),
    brand: Joi.string().optional(),
    model: Joi.string().optional(),
    items: Joi.array().items(Joi.string()).max(5).unique().optional(),
    km: Joi.number().integer().min(0).optional(),
    fromYear: Joi.number()
      .integer()
      .min(new Date().getFullYear() - 10)
      .optional(),
    untilYear: Joi.number()
      .integer()
      .max(new Date().getFullYear() + 1)
      .optional(),
    minPrice: Joi.number().precision(2).positive().optional(),
    maxPrice: Joi.number().precision(2).positive().optional(),
    orderBy: Joi.string().valid("price", "year", "km").optional(),
    orderDirection: Joi.string().valid("ASC", "DESC").optional(),
    page: Joi.number().integer().min(1).optional(),
    perPage: Joi.number().integer().min(1).optional(),
  }),
};
