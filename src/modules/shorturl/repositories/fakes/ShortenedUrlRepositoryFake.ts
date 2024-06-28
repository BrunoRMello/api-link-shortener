import { IShortenedUrl } from '@/modules/shorturl/interfaces/IShortenedUrl';
import { IShortenedUrlRepository } from '@/modules/shorturl/repositories/IShortenedUrlRepository';

import { ShortenedUrl } from '../../infra/typeorm/entities/ShortenedUrl';

export class ShortenedUrlRepositoryFake implements IShortenedUrlRepository {
  private data: ShortenedUrl[] = [];

  async save(shortenedUrl: IShortenedUrl): Promise<IShortenedUrl> {
    const existingIndex = this.data.findIndex(u => u.id === shortenedUrl.id);
    if (existingIndex !== -1) {
      this.data[existingIndex] = { ...shortenedUrl } as ShortenedUrl;
      return this.data[existingIndex];
    }
    this.data.push(shortenedUrl as ShortenedUrl);
    return shortenedUrl;
  }

  async softDelete(shortId: string): Promise<void> {
    const index = this.data.findIndex(u => u.shortId === shortId);
    if (index !== -1) {
      this.data[index].deletedAt = new Date();
    }
  }

  async create(data: {
    originalUrl: string;
    shortUrl: string;
    shortId: string;
    userId?: number;
  }): Promise<IShortenedUrl> {
    const shortenedUrl = new ShortenedUrl();
    shortenedUrl.originalUrl = data.originalUrl;
    shortenedUrl.shortUrl = data.shortUrl;
    shortenedUrl.shortId = data.shortId;
    if (data.userId !== undefined) {
      shortenedUrl.userId = data.userId;
    }
    this.data.push(shortenedUrl);
    return shortenedUrl;
  }

  async findByShortUrl(shortId: string): Promise<IShortenedUrl | null> {
    const shortenedUrl = this.data.find(
      u => u.shortId === shortId && !u.deletedAt,
    );
    return shortenedUrl || null;
  }

  async findByUserId(userId: number): Promise<IShortenedUrl[] | null> {
    const list = this.data.filter(u => u.userId === userId && !u.deletedAt);
    return list;
  }

  async findByOriginalUrl(originalUrl: string): Promise<IShortenedUrl | null> {
    const shortenedUrl = this.data.find(
      u => u.originalUrl === originalUrl && !u.deletedAt,
    );
    return shortenedUrl || null;
  }

  async updateById(shortenedUrlId: number): Promise<void> {
    const index = this.data.findIndex(u => u.id === shortenedUrlId);
    if (index !== -1) {
      // eslint-disable-next-line no-plusplus
      this.data[index].clicks++;
    }
  }
}
