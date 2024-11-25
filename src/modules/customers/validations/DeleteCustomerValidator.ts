import { Joi, Segments } from "celebrate";

export const deleteCustomerValidationSchema = {
    [Segments.PARAMS]: Joi.object({
        id: Joi.string().uuid().required(),
    }),
};
