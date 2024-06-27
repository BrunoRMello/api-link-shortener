export interface IShortenedUrl {
  id?: number;
  originalUrl?: string;
  shortUrl?: string;
  shortId?: string;
  // userId?: number;
  clicks?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
