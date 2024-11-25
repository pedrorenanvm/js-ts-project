import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import { celebrate, Joi } from 'celebrate';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), sessionsController.create);

export default sessionsRouter;