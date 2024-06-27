import { IShortenedUrl } from '../interfaces/IShortenedUrl';
// import { ICreateShortenedUrlDTO } from './dtos/ICreateShortenedUrlDTO';

interface IShortenedUrlRepository {
  create(data: {
    originalUrl: string;
    shortUrl: string;
    shortId: string;
    userId?: number;
  }): Promise<IShortenedUrl>;
  findByShortUrl(shortId: string): Promise<IShortenedUrl | null>;
  updateById(shortenedUrlId: number): Promise<void>;
}

export { IShortenedUrlRepository };
