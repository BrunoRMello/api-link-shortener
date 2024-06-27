import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListOneUserService } from '@/modules/accounts/services/listUserLogin/ListOneUserService';

class ListOneUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listOneUserService = container.resolve(ListOneUserService);
    const userId = request.user.id;
    const user = await listOneUserService.execute({ userId });

    return response.json(user);
  }
}

export { ListOneUserController };
