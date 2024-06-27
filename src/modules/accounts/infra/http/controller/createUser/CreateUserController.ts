import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from '@/modules/accounts/services/createUser/CreateUserService';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUserService = container.resolve(CreateUserService);

    await createUserService.execute({
      name,
      email,
      password,
    });
    // try {

    return response.status(201).send();
  }
}

export { CreateUserController };
