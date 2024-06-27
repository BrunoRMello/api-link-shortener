import { User } from '@/modules/accounts/infra/typeorm/entities/User';
import { UserTokens } from '@/modules/accounts/infra/typeorm/entities/UserTokens';
import { ShortenedUrl } from '@/modules/shorturl/infra/typeorm/entities/ShortenedUrl';

export const entities = [ShortenedUrl, User, UserTokens];
