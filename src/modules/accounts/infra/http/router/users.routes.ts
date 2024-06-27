import { Router } from 'express';

import { ensureAuthenticated } from '@/shared/infra/middlewares/ensureAuthenticated';

import { CreateUserController } from '../controller/createUser/CreateUserController';
import { ListOneUserController } from '../controller/listUserLogin/ListOneUserController';

const usersRouter = Router();

const createUserController = new CreateUserController();
const listOneUserController = new ListOneUserController();

usersRouter.post('/', createUserController.handle);
usersRouter.get('/', ensureAuthenticated, listOneUserController.handle);

export { usersRouter };
