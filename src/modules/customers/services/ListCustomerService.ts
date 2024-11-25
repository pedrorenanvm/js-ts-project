import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

interface IPaginateCustomer {
    total: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
}

interface IRequest {
    name?: string;
    email?: string;
    cpf?: string;
    deleted?: string | boolean;
    page?: number;
    perPage?: number;
    orderBy?: string;
    orderDirection?: "ASC" | "DESC";
}

interface IResponse {
    customers: Customer[];
    pagination: IPaginateCustomer;
}

class ListCustomerService {
    public async execute({
        name,
        email,
        cpf,
        deleted,
        page = 1,
        perPage = 10,
        orderBy = "name",
        orderDirection = "ASC",
    }: IRequest): Promise<IResponse> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const skip = (page - 1) * perPage;

        const queryBuilder = customersRepository.createQueryBuilder("customer");

        if (name) {
            queryBuilder.andWhere("customer.name ILIKE :name", {
                name: `%${name}%`,
            });
        }

        if (email) {
            queryBuilder.andWhere("customer.email ILIKE :email", {
                email: `%${email}%`,
            });
        }

        if (cpf) {
            queryBuilder.andWhere("customer.cpf = :cpf", { cpf });
        }

        if (deleted !== undefined) {
            const isDeleted =
                typeof deleted === "string"
                    ? deleted.toLowerCase() === "true"
                    : deleted;

            if (isDeleted) {
                queryBuilder.andWhere("deleted_at IS NOT NULL");
            } else {
                queryBuilder.andWhere("deleted_at IS NULL");
            }
        }

        const [data, total] = await queryBuilder
            .orderBy(orderBy, orderDirection)
            .skip(skip)
            .take(perPage)
            .getManyAndCount();

        const totalPages = Math.ceil(total / perPage); // Cálculo de páginas

        const pagination: IPaginateCustomer = {
            total,
            totalPages,
            currentPage: page,
            perPage,
        };

        return {
            customers: data,
            pagination,
        };
    }
}

export default ListCustomerService;
