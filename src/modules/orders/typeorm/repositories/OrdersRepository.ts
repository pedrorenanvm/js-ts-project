
import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../entities/Order';

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> {
  
  public async findById(id: string): Promise<Order | undefined> {
    const order = await this.findOne({
      where: { id },
      relations: ['customer', 'car'],
    });
    return order;
  }

  public async findByStatus(status: 'Aberto' | 'Aprovado' | 'Cancelado'): Promise<Order[]> {
    const orders = await this.find({
      where: { status },
      relations: ['customer', 'car'],
    });
    return orders;
  }

  public async findByClienteId(customerId: string): Promise<Order[]> {
    const orders = await this.find({
      where: { customer: { id: customerId } },
      relations: ['customer', 'car'],
    });
    return orders;
  }

  public async findByCarroId(carId: string): Promise<Order[]> {
    const orders = await this.find({
      where: { car: { id: carId } },
      relations: ['customer', 'car'],
    });
    return orders;
  }

  public async findAllOrders(): Promise<Order[]> {
    const orders = await this.find({
      relations: ['customer', 'car'],
    });
    return orders;
  }
}

export default OrdersRepository;
