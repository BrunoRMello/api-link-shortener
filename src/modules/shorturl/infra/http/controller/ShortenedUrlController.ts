import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteShortenedUrlService } from '@/modules/shorturl/services/DeleteShortenedUrlService';
import { ListShortenedUrlByUserService } from '@/modules/shorturl/services/ListShortenedUrlByUserService';
import { ListShortenedUrlService } from '@/modules/shorturl/services/ListShortenedUrlService';
import { ShortenedUrlService } from '@/modules/shorturl/services/ShortenedUrlService';
import { UpdateShortenedUrlByShortIdService } from '@/modules/shorturl/services/UpdateShortenedUrlByShortIdService';

export class ShortenedUrlController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { url } = request.body;
    const userId = request.user.id ?? null;

    const protocol = 'http';
    const host = request.hostname;
    const port = request.app.settings.port || '3333';

    const baseUrl = `${protocol}://${host}:${port}`;

    const shortenedUrlService = container.resolve(ShortenedUrlService);

    const shortened = await shortenedUrlService.execute({
      url,
      baseUrl,
      userId,
    });

    return response.json(shortened);
  }

  public async redirect(request: Request, response: Response): Promise<void> {
    const { shortId } = request.params;

    try {
      const listShortenedUrlService = container.resolve(
        ListShortenedUrlService,
      );
      const shortenedUrl = await listShortenedUrlService.execute({ shortId });

      if (shortenedUrl && shortenedUrl.originalUrl) {
        response.redirect(shortenedUrl.originalUrl);
      } else {
        response.status(404).json({ error: 'URL not found' });
      }
    } catch (error) {
      console.error('Error redirecting:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user?.id;

    if (!userId) {
      return response.status(400).json({ error: 'User not authenticated' });
    }

    const listShortenedUrlByUserService = container.resolve(
      ListShortenedUrlByUserService,
    );

    const list = await listShortenedUrlByUserService.execute({ userId });

    return response.json(list);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { shortId } = request.params;
    const { url } = request.body;

    const userId = request.user.id;

    if (!userId) {
      return response.status(400).json({ error: 'User not authenticated' });
    }

    try {
      const updateShortenedUrlService = container.resolve(
        UpdateShortenedUrlByShortIdService,
      );
      const shortenedUrl = await updateShortenedUrlService.execute({
        shortId,
        url,
      });

      return response.json(shortenedUrl);
    } catch (error) {
      console.error('Error updating URL:', error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { shortId } = request.params;

    const deleteShortenedUrlService = container.resolve(
      DeleteShortenedUrlService,
    );
    await deleteShortenedUrlService.execute({ shortId });

    return response.status(204).send();
  }
}
