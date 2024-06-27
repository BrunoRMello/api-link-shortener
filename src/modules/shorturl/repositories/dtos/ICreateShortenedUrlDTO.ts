export interface ICreateShortenedUrlDTO {
  originalUrl: string;
  shortUrl?: string;
  clicks?: number;
  created_at?: Date;
  updated_at?: Date;
}
