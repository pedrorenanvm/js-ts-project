import { Joi, Segments } from "celebrate";
import { object } from "joi";

export const updateCustomerValidationSchema = {
    [Segments.BODY]: Joi.object({
        name: Joi.string(),
        cpf: Joi.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
        email: Joi.string().email(),
        phone: Joi.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/),
    }),
    [Segments.PARAMS]: Joi.object({
        id: Joi.string().uuid().required(),
    }),
};
