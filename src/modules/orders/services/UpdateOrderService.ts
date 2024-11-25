import { getCustomRepository } from 'typeorm';
import  OrdersRepository  from '../typeorm/repositories/OrdersRepository';
import AppError from '../../../shared/errors/AppError';
import axios from 'axios';
import { CepService } from '../services/CepServices'; // Importa o CepService se necessário

interface IRequest {
    id: string;
    status?: 'APROVADO' | 'CANCELADO';
    cep?: string;
}

export class UpdateOrderService {
    public async execute({ id, status, cep }: IRequest) {
        const ordersRepository = getCustomRepository(OrdersRepository);
        const order = await ordersRepository.findOne(id);

        // Verifica se o pedido existe
        if (!order) {
            throw new AppError('Pedido não encontrado.');
        }

        // Atualiza o status do pedido, se fornecido
        if (status) {
            if (status === 'APROVADO' && !order.dataInicial) {
                throw new AppError('Não é possível aprovar um pedido sem data inicial.');
            }
            order.status = status;

            if (status === 'CANCELADO') {
                order.dataCancelamento = new Date();
            } else if (status === 'APROVADO') {
                order.dataFinal = new Date();
            }
        }

        // Atualiza o CEP e informações relacionadas
        if (cep) {
            const cepInfo = await CepService.buscarEnderecoPorCep(cep);

            // Verifica se houve erro ao buscar o endereço
            if (cepInfo.erro) {
                throw new AppError(cepInfo.erro);
            }

            // Atualiza as informações do pedido
            order.cep = cep;
            order.cidade = cepInfo.cidade;
            order.uf = cepInfo.uf;
        }

        // Salva as alterações no pedido
        await ordersRepository.save(order);
        return order;
    }
}


