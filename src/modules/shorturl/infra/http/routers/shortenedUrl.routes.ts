import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ensureAuthenticated } from '@/shared/infra/middlewares/ensureAuthenticated';

import { ShortenedUrlController } from '../controller/ShortenedUrlController';

const shortenedUrlRouter = Router();

const shortenedUrlController = new ShortenedUrlController();

shortenedUrlRouter.post(
  '/shortenedUrl',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      url: Joi.string()
        .uri({ scheme: [/https?/] })
        .required(),
    }),
  }),
  shortenedUrlController.create,
);

shortenedUrlRouter.get(
  '/list',
  ensureAuthenticated,
  shortenedUrlController.show,
);

shortenedUrlRouter.patch(
  '/:shortId',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      url: Joi.string().required(),
    }),
  }),
  shortenedUrlController.update,
);

shortenedUrlRouter.delete(
  '/:shortId',
  ensureAuthenticated,
  shortenedUrlController.delete,
);

shortenedUrlRouter.get(
  '/:shortId',
  celebrate({
    [Segments.PARAMS]: {
      shortId: Joi.string().required(),
    },
  }),
  shortenedUrlController.redirect,
);

export { shortenedUrlRouter };
