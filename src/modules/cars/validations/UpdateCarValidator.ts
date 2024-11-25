import { Joi, Segments } from "celebrate";

const licensePlatePattern = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;
const currentYear = new Date().getFullYear();

export const updateCarValidationSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object({
    license_plate: Joi.string()
      .pattern(licensePlatePattern)
      .optional()
      .messages({
        "string.pattern.base":
          'Invalid license plate format. Use "AAA1234" or "AAA1A23".',
      }),
    brand: Joi.string().optional(),
    model: Joi.string().optional(),
    km: Joi.number().integer().min(0).optional(),
    year: Joi.number()
      .integer()
      .min(currentYear - 10)
      .max(currentYear + 1)
      .optional(),
    items: Joi.array().items(Joi.string()).max(5).unique().optional(),
    price: Joi.number().precision(2).positive().optional(),
    status: Joi.string().valid("ativo", "inativo").optional(),
  }).min(1),
};
