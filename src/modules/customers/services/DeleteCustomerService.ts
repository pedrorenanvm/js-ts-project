import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest {
    id: string;
}

class DeleteCustomerService {
    public async execute({ id }: IRequest): Promise<void> {
        const customersRepository = getCustomRepository(CustomersRepository);
        const customer = await customersRepository.findById(id);

        if (!customer) {
            throw new AppError("Customer not found.", 404);
        }
        
        customer.deleted_at = new Date(); // Marca o usuário como excluído

        await customersRepository.save(customer);
    }
}

export default DeleteCustomerService;
