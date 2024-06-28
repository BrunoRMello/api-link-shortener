import { inject, injectable } from 'tsyringe';

import { IShortenedUrl } from '../interfaces/IShortenedUrl';
import { IShortenedUrlRepository } from '../repositories/IShortenedUrlRepository';

interface IRequest {
  userId: number;
}

@injectable()
export class ListShortenedUrlByUserService {
  constructor(
    @inject('ShortenedUrlRepository')
    private shortenedUrlRepository: IShortenedUrlRepository,
  ) {}

  async execute({ userId }: IRequest): Promise<IShortenedUrl[] | null> {
    const shortenedUrls = await this.shortenedUrlRepository.findByUserId(
      userId,
    );

    return shortenedUrls;
  }
}
