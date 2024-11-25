import { getCustomRepository } from 'typeorm';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';
import AppError from '../../../shared/errors/AppError';

export class GetOrderService {
    public async execute(id: string) {
        const ordersRepository = getCustomRepository(OrdersRepository);

        const order = await ordersRepository.findById(id);
        if (!order) {
            throw new AppError('Pedido não encontrado', 404);
        }

        return order;
    }
}
