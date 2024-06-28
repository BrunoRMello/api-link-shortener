import { IShortenedUrl } from '../interfaces/IShortenedUrl';
// import { ICreateShortenedUrlDTO } from './dtos/ICreateShortenedUrlDTO';

interface IShortenedUrlRepository {
  save(shortenedUrl: IShortenedUrl): Promise<IShortenedUrl>;
  softDelete(shortId: string): Promise<void>;
  create(data: {
    originalUrl: string;
    shortUrl: string;
    shortId: string;
    userId?: number | null;
  }): Promise<IShortenedUrl>;
  findByShortUrl(shortId: string): Promise<IShortenedUrl | null>;
  updateById(shortenedUrlId: number): Promise<void>;
  findByOriginalUrl(originalUrl: string): Promise<IShortenedUrl | null>;
  findByUserId(userId: number): Promise<IShortenedUrl[] | null>;
}

export { IShortenedUrlRepository };
