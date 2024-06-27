import { ICreateUserTokenDTO } from '../dtos/ICreateUsersTokenDTO';
import { UserTokens } from '../infra/typeorm/entities/UserTokens';

interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;
  findByToken(refresh_token: string): Promise<UserTokens | undefined>;
  deleteById(id: string): Promise<void>;
  deleteByUserId(user_id: string): Promise<void>;
}

export { IUsersTokensRepository };
