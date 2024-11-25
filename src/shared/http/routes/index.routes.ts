import { Router } from 'express';
import customersRouter from "@modules/customers/routes/customers.routes";
import carRouter from "@modules/cars/routes/car.routes";
import sessionsRouter from '../../../modules/users/routes/sessions.routes';
import usersRouter from '../../../modules/users/routes/users.routes';
import orderRouter from '../../../modules/orders/routes/orders.routes';


const router = Router();

router.use('/api/v1/sessions', sessionsRouter);
router.use("/api/v1/customers", customersRouter);
router.use("/api/v1/cars", carRouter);
router.use('/api/v1/users', usersRouter);
router.use('/api/v1/order', orderRouter);


export default router;

