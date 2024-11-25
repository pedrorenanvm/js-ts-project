import { Joi, Segments } from "celebrate";

const licensePlatePattern = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;
const currentYear = new Date().getFullYear();

export const createCarValidationSchema = {
  [Segments.BODY]: Joi.object({
    license_plate: Joi.string()
      .pattern(licensePlatePattern)
      .required()
      .messages({
        "string.pattern.base":
          'Invalid license plate format. Use "AAA1234" or "AAA1A23".',
      }),
    brand: Joi.string().required(),
    model: Joi.string().required(),
    km: Joi.number().integer().min(0).required(),
    year: Joi.number()
      .integer()
      .min(currentYear - 10)
      .max(currentYear + 1)
      .required(),
    items: Joi.array().items(Joi.string()).max(5).unique().required(),
    price: Joi.number().precision(2).positive().required(),
  }),
};
