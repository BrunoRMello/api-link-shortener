import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { uuid } from 'uuidv4';

import auth from '@/configs/auth';
import { IDateProvider } from '@/shared/container/providers/DateProvider/IDateProvider';
import AppError from '@/shared/errors/AppError';

import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';

interface ITokenResponse {
  token: string;
  refreshToken: string | undefined;
}

@injectable()
class RefreshTokenService {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}
  async execute(token: string): Promise<ITokenResponse> {
    const userToken = await this.usersTokensRepository.findByToken(token);

    const user_id = userToken?.user_id;

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const expire = this.dateProvider.addDays(auth.expires_refresh_token_days);

    const refresh_token = await this.usersTokensRepository.create({
      expire,
      token: uuid(),
      user_id,
    });

    const newToken = sign({}, auth.secret_token, {
      subject: user_id?.toString(),
      expiresIn: auth.expires_in_token,
    });

    return {
      refreshToken: refresh_token.token,
      token: newToken,
    };
  }
}

export { RefreshTokenService };
