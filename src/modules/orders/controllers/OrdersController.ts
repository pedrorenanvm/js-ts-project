import { Request, Response } from 'express';
import { CreateOrderService } from '../services/CreateOrderService';
import { GetOrderService } from '../services/GetOrderService';
import { ListOrdersService } from '../services/ListOrdersService';
import { UpdateOrderService } from '../services/UpdateOrderService';
import { CancelOrderService } from '../services/CancelOrderService';

class OrdersController {
    async createOrder(req: Request, res: Response): Promise<Response> {
        const { customerId, carId, cep } = req.body;

        const createOrderService = new CreateOrderService();
        const order = await createOrderService.execute({
            customerId,
            carId,
            cep,
            status: 'ABERTO',
            valorTotal: 0, // Inicia com 0 e é atualizado conforme necessário
            dataInicial: new Date(),
        });

        return res.status(201).json(order);
    }

    async getOrderById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const getOrderService = new GetOrderService();
        const order = await getOrderService.execute(id); // Passa `id` como parte de um objeto

        return res.json(order);
    }

    async listOrders(req: Request, res: Response): Promise<Response> {
        const listOrdersService = new ListOrdersService();
        const orders = await listOrdersService.execute();

        return res.json(orders);
    }

    async updateOrder(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const updateData = req.body;

        const updateOrderService = new UpdateOrderService();
        const updatedOrder = await updateOrderService.execute({ id, ...updateData }); // Passa `id` e `updateData` como um único objeto

        return res.json(updatedOrder);
    }

    async cancelOrder(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const cancelOrderService = new CancelOrderService();
        await cancelOrderService.execute({ id }); // Passa `id` como parte de um objeto

        return res.status(204).send();
    }
}

export default OrdersController;
