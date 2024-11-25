import AppError from "@shared/errors/AppError";
import { getCustomRepository, Not } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest {
    id: string;
    name?: string;
    cpf?: string;
    email?: string;
    phone?: string;
}

class UpdateCustomerService {
    public async execute({
        id,
        name,
        cpf,
        email,
        phone,
    }: IRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = await customersRepository.findById(id);

        if (!customer) {
            throw new AppError("Customer not found.");
        }
        
        if (!validarCPF(customer.cpf)) {
            throw new AppError("Invalid CPF.");
        }

        const customerExistsEmail = await customersRepository.findOne({
            where: { email, id: Not(id) },
            select: ["id"],
        });

        const customerExistsCpf = await customersRepository.findOne({
            where: { cpf, id: Not(id) },
            select: ["id"],
        });

        if (
            (customerExistsEmail && email !== customer.email) ||
            (customerExistsCpf && cpf !== customer.cpf)
        ) {
            throw new AppError(
                "There is already one customer with this email or CPF."
            );
        }

        if (name !== undefined) {
            customer.name = name;
        }
        if (cpf !== undefined) {
            customer.cpf = cpf;
        }
        if (email !== undefined) {
            customer.email = email;
        }
        if (phone !== undefined) {
            customer.phone = phone;
        }

        await customersRepository.save(customer);

        return customer;
    }
}

function validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove any character that is not a digit

    let soma = 0;
    let resto;

    // Calculates the first check digit
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;

    // Calculates the second check digit
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
}

export default UpdateCustomerService;
