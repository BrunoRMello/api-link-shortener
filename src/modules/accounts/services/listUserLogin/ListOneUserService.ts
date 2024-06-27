import { inject, injectable } from 'tsyringe';

import { User } from '../../infra/typeorm/entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  userId: string;
}

@injectable()
class ListOneUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}
  async execute({ userId }: IRequest): Promise<User | undefined> {
    const user = await this.userRepository.findById(userId);

    return user;
  }
}

export { ListOneUserService };
