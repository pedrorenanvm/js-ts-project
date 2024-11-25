import { Joi, Segments } from "celebrate";

export const showCarValidationSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().uuid().required(),
  }),
};