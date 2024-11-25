import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';

class DeleteUserService {
  public async execute(id: string): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    user.deleted_at = new Date(); // Marca o usuário como excluído

    await usersRepository.save(user);
  }
}

export default DeleteUserService;