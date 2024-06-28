import { injectable } from 'tsyringe';
import { IsNull, Repository } from 'typeorm';

import { IShortenedUrl } from '@/modules/shorturl/interfaces/IShortenedUrl';
import { IShortenedUrlRepository } from '@/modules/shorturl/repositories/IShortenedUrlRepository';
import { appDataSource } from '@/shared/infra/http/typeorm';

import { ShortenedUrl } from '../entities/ShortenedUrl';

@injectable()
export class ShortenedUrlRepository implements IShortenedUrlRepository {
  private repository: Repository<ShortenedUrl>;

  constructor() {
    this.repository = appDataSource.manager.getRepository(ShortenedUrl);
  }
  async save(shortenedUrl: IShortenedUrl): Promise<IShortenedUrl> {
    const savedShortenedUrl = await this.repository.save(shortenedUrl);
    return savedShortenedUrl;
  }
  async softDelete(shortId: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update(ShortenedUrl)
      .set({ deletedAt: new Date() })
      .where('shortId = :shortId', { shortId })
      .execute();
  }

  async create(data: {
    originalUrl: string;
    shortUrl: string;
    shortId: string;
    userId?: number;
  }): Promise<IShortenedUrl> {
    const shortenedUrl = this.repository.create(data);
    await this.repository.save(shortenedUrl);
    return shortenedUrl;
  }

  async findByShortUrl(shortId: string): Promise<IShortenedUrl | null> {
    const shortenedUrl = await this.repository.findOne({
      where: { shortId, deletedAt: IsNull() },
    });
    return shortenedUrl;
  }

  async findByUserId(userId: number): Promise<IShortenedUrl[] | null> {
    const list = await this.repository.find({ where: { userId } });
    return list;
  }

  async findByOriginalUrl(originalUrl: string): Promise<ShortenedUrl | null> {
    return this.repository.findOne({ where: { originalUrl } });
  }

  async updateById(shortenedUrlId: number): Promise<void> {
    await appDataSource
      .createQueryBuilder()
      .update(ShortenedUrl)
      .set({ clicks: () => '`clicks` + 1' })
      .where('id = :id', { id: shortenedUrlId })
      .execute();
  }
}
