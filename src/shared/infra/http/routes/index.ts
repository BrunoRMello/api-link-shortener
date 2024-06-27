import { Router } from 'express';

import { shortenedUrlRouter } from '@/modules/shorturl/infra/http/routers/shortenedUrl.routes';

const routes = Router();

routes.use('/', shortenedUrlRouter);

export { routes };
