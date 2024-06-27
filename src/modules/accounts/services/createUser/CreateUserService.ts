import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import AppError from '@/shared/errors/AppError';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password }: IRequest): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }
    const passwordHash = await hash(password, 8);
    const createUserData: ICreateUserDTO = {
      name,
      email,
      password: passwordHash,
    };
    await this.userRepository.create(createUserData);
  }
}

export { CreateUserService };
