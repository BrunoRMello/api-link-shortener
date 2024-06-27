export interface ICreateShortenedUrlDTO {
  originalUrl: string;
  shortUrl?: string;
  userId?: number;
  clicks?: number;
  created_at?: Date;
  updated_at?: Date;
}
