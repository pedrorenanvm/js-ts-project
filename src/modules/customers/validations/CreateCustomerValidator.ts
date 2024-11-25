import { Joi, Segments } from "celebrate";

export const createCustomerValidationSchema = {
    [Segments.BODY]: Joi.object({
        name: Joi.string().required(),
        dateOfBirth: Joi.date().required(),
        cpf: Joi.string()
            .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
            .required(),
        email: Joi.string().email().required(),
        phone: Joi.string()
            .regex(/^\(\d{2}\) \d{5}-\d{4}$/)
            .required(),
    }),
};
