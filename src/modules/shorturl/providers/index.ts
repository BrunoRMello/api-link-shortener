import { container } from 'tsyringe';

import { ShortenedUrlRepository } from '../infra/typeorm/repositories/ShortenedUrlRepository';
import { IShortenedUrlRepository } from '../repositories/IShortenedUrlRepository';

container.registerSingleton<IShortenedUrlRepository>(
  'ShortenedUrlRepository',
  ShortenedUrlRepository,
);
