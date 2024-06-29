import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '@/modules/accounts/infra/typeorm/entities/User';

@Entity('shortened_urls')
class ShortenedUrl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: null, nullable: true })
  originalUrl: string;

  @Column({ type: 'varchar', default: null, nullable: true })
  shortUrl: string;

  @Column({ type: 'varchar', default: null, nullable: true })
  shortId: string;

  @Column({ type: 'int', nullable: true })
  userId: number;

  @ManyToOne(() => User, user => user.shortenedUrls)
  user: User;

  @Column({ type: 'int', default: 0, name: 'clicks', nullable: true })
  clicks: number;

  @Column({
    type: 'timestamp',
    default: null,
    name: 'deletedAt',
    nullable: true,
  })
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export { ShortenedUrl };
