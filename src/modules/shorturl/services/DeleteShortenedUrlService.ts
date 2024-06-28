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
    const teste = await this.shortenedUrlRepository.softDelete(shortId);

    console.log(shortId);
    console.log('achou esse', teste);
  }
}
