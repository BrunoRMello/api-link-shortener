import { Repository } from 'typeorm';

import { ICreateUserDTO } from '@/modules/accounts/dtos/ICreateUserDTO';
import { IUsersRepository } from '@/modules/accounts/repositories/IUsersRepository';
import { appDataSource } from '@/shared/infra/http/typeorm';

import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = appDataSource.manager.getRepository(User);
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      ...data,
      created: new Date(),
      modified: new Date(),
    });

    await this.repository.save(user);
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: { email },
    });
    return user || undefined;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      select: ['id', 'email'],
      where: { id },
    });

    return user || undefined;
  }
}

export { UsersRepository };
