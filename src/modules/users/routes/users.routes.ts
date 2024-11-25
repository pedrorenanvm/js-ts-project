import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';


const usersRouter = Router();
const usersController = new UsersController();


usersRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.delete(
    '/:id', 
    isAuthenticated,
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }), 
    usersController.delete
  );
  
  usersRouter.get(
    '/:id',
    isAuthenticated,
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    usersController.show,
  );
  
  usersRouter.get(
    '/',
    isAuthenticated,
    celebrate({
      [Segments.QUERY]: {
        name: Joi.string().optional(),
        email: Joi.string().optional(),
        deleted: Joi.boolean().optional(),
        page: Joi.number().integer().min(1).optional(), 
        perPage: Joi.number().integer().min(1).optional(), 
        orderBy: Joi.string().valid('name', 'created_at', 'deleted_at').optional(), 
        orderDirection: Joi.string().valid('ASC', 'DESC').optional(),
      },
    }),
    usersController.index,
  );

  usersRouter.patch(
    '/:id',
    isAuthenticated,
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
        password: Joi.string().optional(),
      },
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    usersController.update,
  );

export default usersRouter;