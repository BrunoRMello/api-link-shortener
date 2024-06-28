import { inject, injectable } from 'tsyringe';

import { IShortenedUrl } from '../interfaces/IShortenedUrl';
import { IShortenedUrlRepository } from '../repositories/IShortenedUrlRepository';

interface IRequest {
  shortId: string;
  url: string;
}

@injectable()
export class UpdateShortenedUrlByShortIdService {
  constructor(
    @inject('ShortenedUrlRepository')
    private shortenedUrlRepository: IShortenedUrlRepository,
  ) {}

  async execute({ shortId, url }: IRequest): Promise<IShortenedUrl> {
    const shortenedUrl = await this.shortenedUrlRepository.findByShortUrl(
      shortId,
    );

    if (!shortenedUrl) {
      throw new Error('Shortened URL not found');
    }

    shortenedUrl.originalUrl = url;

    await this.shortenedUrlRepository.save(shortenedUrl);

    return shortenedUrl;
  }
}
