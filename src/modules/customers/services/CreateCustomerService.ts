import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest {
    name: string;
    dateOfBirth: Date;
    cpf: string;
    email: string;
    phone: string;
}

class CreateCustomerService {
    public async execute({
        name,
        dateOfBirth,
        cpf,
        email,
        phone,
    }: IRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomersRepository);

        if (!validarCPF(cpf)) {
            throw new AppError("Invalid CPF.");
        }

        const emailExists = await customersRepository.findByEmail(email);
        const cpfExists = await customersRepository.findByCpf(cpf);

        if (emailExists || cpfExists) {
            throw new AppError("Email address or CPF already used.");
        }

        const customer = customersRepository.create({
            name,
            dateOfBirth,
            cpf,
            email,
            phone,
        });

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

export default CreateCustomerService;
