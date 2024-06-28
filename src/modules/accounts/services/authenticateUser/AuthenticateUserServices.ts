import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';

import auth from '@/configs/auth';
import { IDateProvider } from '@/shared/container/providers/DateProvider/IDateProvider';
import AppError from '@/shared/errors/AppError';

import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    email: string;
  };
  token: string;
  refreshToken: string | undefined;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);
    const { expires_in_token, secret_token, expires_refresh_token_days } = auth;

    if (!user) {
      throw new AppError('Email or password incorrect');
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError('Email or password incorrect');
    }

    const token = sign({}, secret_token, {
      subject: user.id.toString(),
      expiresIn: expires_in_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days,
    );

    await this.usersTokensRepository.deleteByUserId(user.id);

    const refresh_token = await this.usersTokensRepository.create({
      user_id: user.id.toString(),
      expire: refresh_token_expires_date,
      token: uuidv4(),
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        email: user.email,
      },
      refreshToken: refresh_token.token,
    };
    return tokenReturn;
  }
}

export { AuthenticateUserService };
