import { getCustomRepository } from 'typeorm';
import  OrdersRepository  from '../typeorm/repositories/OrdersRepository';

export class ListOrdersService {
    public async execute() {
        const ordersRepository = getCustomRepository(OrdersRepository);
        const orders = await ordersRepository.findAllOrders();

        return orders;
    }
}
