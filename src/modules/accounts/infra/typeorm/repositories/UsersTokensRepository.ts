import { Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '@/modules/accounts/dtos/ICreateUsersTokenDTO';
import { IUsersTokensRepository } from '@/modules/accounts/repositories/IUsersTokensRepository';
import { appDataSource } from '@/shared/infra/http/typeorm';

import { UserTokens } from '../entities/UserTokens';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = appDataSource.manager.getRepository(UserTokens);
  }

  async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      ...data,
      created: new Date(),
      modified: new Date(),
    });

    await this.repository.save(userToken);

    return userToken;
  }
  async findByToken(token: string): Promise<UserTokens | undefined> {
    const userToken = await this.repository.findOne({
      where: { token },
    });

    return userToken || undefined;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteByUserId(user_id: string): Promise<void> {
    await this.repository.delete({ user_id });
  }
}

export { UsersTokensRepository };
