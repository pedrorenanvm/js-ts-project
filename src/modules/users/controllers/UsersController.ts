import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import { instanceToInstance } from 'class-transformer';
import DeleteUserService from '../services/DeleteUserService';
import ListUserService from '../services/ListUserService';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(instanceToInstance(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUserService = new DeleteUserService();

    await deleteUserService.execute(id);

    return response.status(204).send(); 
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUser = new ShowUserService(); 

    const user = await showUser.execute({ id }); 

    return response.json(instanceToInstance(user));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      deleted,
      page,
      perPage,
      orderBy,
      orderDirection,
    } = request.query as any;


    const listUsers = new ListUserService();

    const { users, pagination } = await listUsers.execute({
      name,
      email,
      deleted,
      page: page ? parseInt(page) : undefined,  
      perPage: perPage ? parseInt(perPage) : undefined, 
      orderBy,
      orderDirection,
    });


    if (users.length === 0) {
        return response.json({ message: "Nenhum usuário encontrado", ...pagination, users });
    }

    return response.json({ users, ...pagination });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, password } = request.body;

    const updateUserService = new UpdateUserService();
    const user = await updateUserService.execute({ id, name, email, password });

    return response.json(instanceToInstance(user));
  }
}