import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs'; 
import { Not } from 'typeorm';

interface IRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password }: IRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found');
    }

    if (user.deleted_at) { 
      throw new AppError('Cannot update a deleted user.');
    }

    // verifica se o email ja existe em outro usuário nao deletado
    if (email) {
      const emailExists = await usersRepository.findOne({
        where: {
          email,
          deleted_at: null,
          id: Not(id), // nao considera o usuário atual na pesquisa de email
        },
      });
      if (emailExists) {
        throw new AppError('Email address already used.');
      }
    }

    if (password) {
      user.password = await hash(password, 8);
    }

    if(name) user.name = name;
    if(email) user.email = email;

    await usersRepository.save(user);
    return user;
  }
}

export default UpdateUserService;