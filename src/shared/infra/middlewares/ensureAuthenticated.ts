import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@/configs/auth';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (authHeader) {
    const [, token] = authHeader.split(' ');

    try {
      const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

      request.user = {
        id: user_id,
      };
    } catch (error) {
      // Ignore token verification errors
    }
  }

  return next();
}
