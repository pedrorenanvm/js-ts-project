// src/services/ListUserService.ts
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { instanceToInstance } from 'class-transformer';
import User from '../typeorm/entities/User';

interface IPagination {
  total: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

interface IRequest {
  name?: string;
  email?: string;
  deleted?: string | boolean;
  page?: number;
  perPage?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
}

interface IResponse {
  users: User[];
  pagination: IPagination;
}


class ListUserService {
  public async execute({
    name,
    email,
    deleted,
    page = 1,
    perPage = 10,
    orderBy = 'name',
    orderDirection = 'ASC',
  }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);

    const skip = (page - 1) * perPage;

    const queryBuilder = usersRepository.createQueryBuilder('user');

    if (name) {
      queryBuilder.andWhere('user.name LIKE :name', { name: `%${name}%` });
    }

    if (email) {
      queryBuilder.andWhere('user.email LIKE :email', { email: `%${email}%` });
    }

    if (deleted !== undefined) {
        const isDeleted = typeof deleted === 'string' ? deleted.toLowerCase() === 'true' : deleted;
  
        if (isDeleted) {
          queryBuilder.andWhere('deleted_at IS NOT NULL');  
        } else {
          queryBuilder.andWhere('deleted_at IS NULL');  
        }
      }
    const [users, total] = await queryBuilder
        .orderBy(orderBy, orderDirection) 
        .skip(skip)
        .take(perPage)
        .getManyAndCount();

    const totalPages = Math.ceil(total / perPage);

    const pagination: IPagination = {
      total,
      totalPages,
      currentPage: page,
      perPage,
    };

    return {
      users: instanceToInstance(users),
      pagination,
    };
  }
}

export default ListUserService;