import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListShortenedUrlService } from '@/modules/shorturl/services/ListShortenedUrlService';
import { ShortenedUrlService } from '@/modules/shorturl/services/ShortenedUrlService';

export class ShortenedUrlController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { url } = request.body;

    const protocol = 'http';
    const host = request.hostname;
    const port = request.app.settings.port || '3333';

    const baseUrl = `${protocol}://${host}:${port}`;

    const shortenedUrlService = container.resolve(ShortenedUrlService);

    const shortened = await shortenedUrlService.execute({ url, baseUrl });

    return response.json(shortened);
  }

  public async redirect(request: Request, response: Response): Promise<void> {
    const { shortId } = request.params;

    try {
      const listShortenedUrlService = container.resolve(
        ListShortenedUrlService,
      );
      const shortenedUrl = await listShortenedUrlService.execute({ shortId });

      response.redirect(shortenedUrl.originalUrl);
    } catch (error) {
      console.error('Error redirecting:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  }
}
