import { Joi, Segments } from "celebrate";

export const showCustomerValidationSchema = {
    [Segments.BODY]: Joi.object({
        id: Joi.string().uuid().required(),
    }),
};
