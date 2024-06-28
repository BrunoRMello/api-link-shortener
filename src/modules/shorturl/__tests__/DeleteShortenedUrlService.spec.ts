import 'reflect-metadata';

import { container } from 'tsyringe';

import { DeleteShortenedUrlService } from '@/modules/shorturl/services/DeleteShortenedUrlService';

import { ShortenedUrlRepositoryFake } from '../repositories/fakes/ShortenedUrlRepositoryFake';

describe('DeleteShortenedUrlService', () => {
  let service: DeleteShortenedUrlService;
  let repository: ShortenedUrlRepositoryFake;

  beforeEach(() => {
    repository = new ShortenedUrlRepositoryFake();
    container.registerInstance('ShortenedUrlRepository', repository);
    service = container.resolve(DeleteShortenedUrlService);
  });

  it('deve deletar uma URL encurtada', async () => {
    const shortId = 'exampleShortId';

    // Chama o método execute do serviço para deletar a URL encurtada
    await service.execute({ shortId });
  });
});
