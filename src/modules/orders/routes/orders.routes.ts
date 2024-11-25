import { Router } from 'express';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();

// Rota para criar um novo pedido
ordersRouter.post('/', isAuthenticated, ordersController.createOrder);

// Rota para consultar um pedido por ID
ordersRouter.get('/:id', isAuthenticated, ordersController.getOrderById);

// Rota para listar todos os pedidos com filtros opcionais
ordersRouter.get('/', isAuthenticated, ordersController.listOrders);

// Rota para atualizar informações de um pedido
ordersRouter.put('/:id', isAuthenticated, ordersController.updateOrder);

// Rota para cancelar um pedido
ordersRouter.delete('/:id', isAuthenticated, ordersController.cancelOrder);

export default ordersRouter;
