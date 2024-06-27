import { inject, injectable } from 'tsyringe';

import { IShortenedUrl } from '../interfaces/IShortenedUrl';
import { IShortenedUrlRepository } from '../repositories/IShortenedUrlRepository';

interface IRequest {
  shortId: string;
}

@injectable()
export class ListShortenedUrlService {
  constructor(
    @inject('ShortenedUrlRepository')
    private shortenedUrlRepository: IShortenedUrlRepository,
  ) {}

  public async execute({ shortId }: IRequest): Promise<IShortenedUrl> {
    try {
      const shortenedUrl = await this.shortenedUrlRepository.findByShortUrl(
        shortId,
      );

      if (!shortenedUrl) {
        throw new Error('Shortened URL not found');
      }

      if (typeof shortenedUrl.id !== 'number') {
        throw new Error('Invalid shortenedUrl.id type');
      }

      await this.shortenedUrlRepository.updateById(shortenedUrl.id);

      return shortenedUrl;
    } catch (error) {
      throw new Error('Error find Shortened URL');
    }
  }
}
