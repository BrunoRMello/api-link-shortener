import { Router } from 'express';

import { AuthenticateUserController } from '../controller/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '../controller/refreshToken/RefreshTokenController';

const authenticateRouter = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRouter.post('/sessions', authenticateUserController.handle);
authenticateRouter.post('/refresh-token', refreshTokenController.handle);
export { authenticateRouter };
