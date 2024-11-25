import { EntityRepository, Repository } from "typeorm";
import Customer from "../entities/Customer";

interface IRequest {
    name?: string;
    email?: string;
    cpf?: string;
    orderBy?: string;
    order?: "ASC" | "DESC";
}

@EntityRepository(Customer)
class CustomersRepository extends Repository<Customer> {
    public async findByName(name: string): Promise<Customer | undefined> {
        const customer = await this.findOne({
            where: {
                name,
            },
        });

        return customer;
    }

    public async findById(id: string): Promise<Customer | undefined> {
        const customer = await this.findOne({
            where: {
                id,
            },
        });

        return customer;
    }

    public async findByCpf(cpf: string): Promise<Customer | undefined> {
        const customer = await this.findOne({
            where: {
                cpf,
                deleted_at: null
            },
        });

        return customer;
    }

    public async findByEmail(email: string): Promise<Customer | undefined> {
        const customer = await this.findOne({
            where: {
                email,
                deleted_at: null
            },
        });

        return customer;
    }

    public async findAll({
        name,
        email,
        cpf,
        orderBy,
        order = "ASC",
    }: IRequest): Promise<Customer[]> {
        const queryBuilder = this.createQueryBuilder("customer");

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

        if (orderBy) {
            queryBuilder.orderBy(`customer.${orderBy}`, order);
        }

        return await queryBuilder.getMany();
    }
}

export default CustomersRepository;
