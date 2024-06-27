import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ShortenedUrlController } from '../controller/ShortenedUrlController';

const shortenedUrlRouter = Router();

const shortenedUrlController = new ShortenedUrlController();

shortenedUrlRouter.post(
  '/shortenedUrl',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      url: Joi.string().required(),
    }),
  }),
  shortenedUrlController.create,
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