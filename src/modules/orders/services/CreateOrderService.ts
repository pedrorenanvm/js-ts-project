import { getCustomRepository } from 'typeorm';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';
import CustomersRepository from '../../customers/typeorm/repositories/CustomersRepository';
import CarsRepository from '../../cars/typeorm/repositories/CarRepository';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
    customerId: string;
    carId: string;
    cep: string;
    status: 'ABERTO' | 'APROVADO' | 'CANCELADO';
    valorTotal: number;
    dataInicial: Date;
}

export class CreateOrderService {
    public async execute({
        customerId,
        carId,
        cep,
        status,
        valorTotal,
        dataInicial,
    }: IRequest) {
        const ordersRepository = getCustomRepository(OrdersRepository);
        const customersRepository = getCustomRepository(CustomersRepository);
        const carsRepository = getCustomRepository(CarsRepository);

        // Verificar se o cliente existe
        const customer = await customersRepository.findOne(customerId);
        if (!customer) {
            throw new AppError('Cliente não encontrado', 404);
        }

        // Verificar se o carro existe
        const car = await carsRepository.findOne(carId);
        if (!car) {
            throw new AppError('Carro não encontrado', 404);
        }

        // Criar o pedido com referências de cliente e carro
        const order = ordersRepository.create({
            customer,
            car,
            cep,
            status,
            valorTotal,
            dataInicial,
        });

        await ordersRepository.save(order);
        return order;
    }
}
