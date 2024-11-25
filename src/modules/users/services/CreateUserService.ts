import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import * as yup from 'yup';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const schema = yup.object().shape({
        name: yup.string().required().min(3).max(255), 
        email: yup.string().email().required().max(255), 
        password: yup.string().required().min(6), 
      });
  
  
      try {
        await schema.validate({ name, email, password });
      } catch (err: any) {
        throw new AppError(err.errors[0]);
      }

    const emailExists = await usersRepository.findOne({
        where: {
          email,
          deleted_at: null, 
        },
      });
  
  
      if (emailExists) {
        throw new AppError('Email address already used.');
      }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;