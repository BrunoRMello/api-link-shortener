import { Router } from 'express';

import { authenticateRouter } from '@/modules/accounts/infra/http/router/authenticate.routes';
import { usersRouter } from '@/modules/accounts/infra/http/router/users.routes';
import { shortenedUrlRouter } from '@/modules/shorturl/infra/http/routers/shortenedUrl.routes';

const routes = Router();

routes.use('/', shortenedUrlRouter);
routes.use('/users', usersRouter);
routes.use(authenticateRouter);

export { routes };
