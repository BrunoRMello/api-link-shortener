import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column({ type: 'int', default: 0, nullable: true })
  clicks: number;

  // @Column({ type: 'datetime', nullable: false })
  @CreateDateColumn()
  createdAt: Date;

  // @Column({ type: 'datetime', nullable: false })
  @UpdateDateColumn()
  updatedAt: Date;
}

export { ShortenedUrl };
