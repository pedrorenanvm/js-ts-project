import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class ShowUserService {
  public async execute({ id }: IRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return user;
  }
}

export default ShowUserService;