export interface IShortenedUrl {
  id?: number;
  originalUrl?: string;
  shortUrl?: string;
  shortId?: string;
  clicks?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
