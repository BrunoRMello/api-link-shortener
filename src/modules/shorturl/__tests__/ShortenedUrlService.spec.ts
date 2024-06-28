import { ShortenedUrlRepositoryFake } from '../repositories/fakes/ShortenedUrlRepositoryFake';
import { ShortenedUrlService } from '../services/ShortenedUrlService';

describe('ShortenedUrlService', () => {
  let service: ShortenedUrlService;
  let repository: ShortenedUrlRepositoryFake;

  beforeEach(() => {
    repository = new ShortenedUrlRepositoryFake();
    service = new ShortenedUrlService(repository);
  });

  it('should create a shortened URL', async () => {
    const data = {
      url: 'https://example.com',
      baseUrl: 'https://short.url',
      userId: 1,
    };

    const shortenedUrl = await service.execute(data);

    expect(shortenedUrl).toHaveProperty('originalUrl', data.url);
    expect(shortenedUrl).toHaveProperty('shortUrl');
    expect(shortenedUrl).toHaveProperty('shortId');
    expect(shortenedUrl).toHaveProperty('userId', data.userId);
  });

  it('should return existing shortened URL if already created', async () => {
    const existingUrl = {
      id: 1,
      originalUrl: 'https://example.com',
      shortUrl: 'https://short.url/abc123',
      shortId: 'abc123',
      userId: 1,
    };

    repository.save(existingUrl);

    const data = {
      url: 'https://example.com',
      baseUrl: 'https://short.url',
      userId: 1,
    };

    const shortenedUrl = await service.execute(data);

    expect(shortenedUrl).toEqual(existingUrl);
  });

  it('should soft delete a shortened URL', async () => {
    const existingUrl = {
      id: 1,
      originalUrl: 'https://example.com',
      shortUrl: 'https://short.url/abc123',
      shortId: 'abc123',
      userId: 1,
    };

    repository.save(existingUrl);

    await repository.softDelete(existingUrl.shortId);

    const deletedUrl = await repository.findByShortUrl(existingUrl.shortId);

    expect(deletedUrl).toBeDefined();

    if (deletedUrl) {
      expect(deletedUrl.deletedAt).toBeDefined();
    }
  });
});
