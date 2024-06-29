import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ShortenedUrl } from '@/modules/shorturl/infra/typeorm/entities/ShortenedUrl';

import { UserTokens } from './UserTokens';

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 255, name: 'name' })
  name: string;

  @Column({ type: 'varchar', length: 255, name: 'email' })
  email: string;

  @Column({ type: 'varchar', name: 'password', nullable: false })
  password!: string;

  @CreateDateColumn({ name: 'created', type: 'timestamp' })
  created: Date;

  @CreateDateColumn()
  modified: Date;

  @OneToMany(() => UserTokens, refresh_tokens => refresh_tokens.user_id)
  refresh_tokens: UserTokens[];

  @OneToMany(() => ShortenedUrl, shortenedUrl => shortenedUrl.user)
  shortenedUrls: ShortenedUrl[];
}
export { User };
