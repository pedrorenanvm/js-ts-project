import { Request, Response } from "express";
import CreateCustomerService from "../services/CreateCustomerService";
import DeleteCustomerService from "../services/DeleteCustomerService";
import ListCustomerService from "../services/ListCustomerService";
import ShowCustomerService from "../services/ShowCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";

export default class CustomersController {
    public async index(req: Request, res: Response): Promise<Response> {
        const {
            name,
            email,
            cpf,
            deleted,
            page,
            perPage,
            orderBy,
            orderDirection,
        } = req.query as any;

        const listCustomersService = new ListCustomerService();

        const { customers, pagination } = await listCustomersService.execute({
            name,
            email,
            cpf,
            deleted,
            page: page ? parseInt(page) : undefined,
            perPage: perPage ? parseInt(perPage) : undefined,
            orderBy,
            orderDirection,
        });

        if (customers.length === 0) {
            return res.json({
                message: "Nenhum usuário encontrado",
                ...pagination,
                customers,
            });
        }

        return res.json({ customers, ...pagination });
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showCustomer = new ShowCustomerService();

        const customer = await showCustomer.execute({ id });

        return response.json(customer);
    }

    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { name, dateOfBirth, cpf, email, phone } = request.body;

        const createCustomer = new CreateCustomerService();

        const customer = await createCustomer.execute({
            name,
            dateOfBirth,
            cpf,
            email,
            phone,
        });

        return response.json(customer);
    }

    public async update(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { name, cpf, email, phone } = request.body;
        const { id } = request.params;

        const updateCustomer = new UpdateCustomerService();

        const customer = await updateCustomer.execute({
            id,
            name,
            cpf,
            email,
            phone,
        });

        return response.json(customer);
    }

    public async delete(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { id } = request.params;

        const deleteCustomer = new DeleteCustomerService();

        await deleteCustomer.execute({ id });

        return response.json([]);
    }
}
