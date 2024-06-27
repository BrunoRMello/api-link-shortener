import { nanoid } from 'nanoid';
import { inject, injectable } from 'tsyringe';

import { IShortenedUrl } from '../interfaces/IShortenedUrl';
import { IShortenedUrlRepository } from '../repositories/IShortenedUrlRepository';

interface IRequest {
  url: string;
  baseUrl: string;
}

@injectable()
export class ShortenedUrlService {
  constructor(
    @inject('ShortenedUrlRepository')
    private shortenedUrlRepository: IShortenedUrlRepository,
  ) {}

  private async generateUniqueShortId(): Promise<string> {
    const shortId = nanoid(6);
    const existingShortenedUrl = await this.findShortenedUrl(shortId);

    if (existingShortenedUrl) {
      return this.generateUniqueShortId();
    }

    return shortId;
  }

  private async findShortenedUrl(
    shortId: string,
  ): Promise<IShortenedUrl | null> {
    const existingShortenedUrl =
      await this.shortenedUrlRepository.findByShortUrl(shortId);
    return existingShortenedUrl || null;
  }

  async execute({ url, baseUrl }: IRequest): Promise<IShortenedUrl> {
    const shortId = await this.generateUniqueShortId();
    const shortUrl = `${baseUrl}/${shortId}`;

    const shortenedUrl = await this.shortenedUrlRepository.create({
      originalUrl: url,
      shortUrl,
      shortId,
    });

    return shortenedUrl;
  }
}
