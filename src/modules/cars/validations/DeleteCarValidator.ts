import { Joi, Segments } from "celebrate";

export const deleteCarValidationSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().uuid().required(),
  }),
};
