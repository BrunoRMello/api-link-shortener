import { Request, Response } from 'express';
import { container, injectable } from 'tsyringe';

import { RefreshTokenService } from '@/modules/accounts/services/refreshToken/RefreshTokenService';

@injectable()
class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers['x-access-token'] ||
      request.query.token;

    const refreshTokenService = container.resolve(RefreshTokenService);

    const refreshToken = await refreshTokenService.execute(token);

    return response.json(refreshToken);
  }
}

export { RefreshTokenController };
