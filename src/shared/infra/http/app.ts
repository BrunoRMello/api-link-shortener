import 'reflect-metadata';
import './typeorm/index';
import '@/shared/container';

import { errors as celebrateErrors } from 'celebrate';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
// import { env } from 'process';
import swaggerUi from 'swagger-ui-express';

import AppError from '@/shared/errors/AppError';

import swaggerFile from '../../../swagger.json';
import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());

const swaggerOptions = {
  customSiteTitle: 'Api eManager',
  tagsSorter: 'alpha',
  filter: true,
  docExpansion: 'none',
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, swaggerOptions));

app.use(routes);

app.use(celebrateErrors());
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      error: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export { app };
