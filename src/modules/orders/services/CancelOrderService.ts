import { getCustomRepository } from 'typeorm';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  id: string;
}

export class CancelOrderService {
  public async execute({ id }: IRequest) {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const order = await ordersRepository.findOne(id);

    if (!order) {
      throw new AppError('Pedido não encontrado.');
    }

    if (order.status !== 'ABERTO') {
      throw new AppError('Apenas pedidos abertos podem ser cancelados.');
    }

    order.status = 'CANCELADO';
    order.dataCancelamento = new Date();

    await ordersRepository.save(order);
    return order;
  }
}

 