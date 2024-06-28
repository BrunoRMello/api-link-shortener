import { inject, injectable } from 'tsyringe';

import { IShortenedUrlRepository } from '../repositories/IShortenedUrlRepository';

interface IRequest {
  shortId: string;
}

@injectable()
export class DeleteShortenedUrlService {
  constructor(
    @inject('ShortenedUrlRepository')
    private shortenedUrlRepository: IShortenedUrlRepository,
  ) {}

  async execute({ shortId }: IRequest): Promise<void | null> {
    await this.shortenedUrlRepository.softDelete(shortId);
  }
}
