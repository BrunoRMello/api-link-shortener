import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './User';

@Entity('refresh_tokens')
class UserTokens {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'integer', name: 'user_id', nullable: false })
  user_id?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  users: User;

  @Column({ type: 'varchar', length: 255, name: 'token', nullable: false })
  token?: string;

  @Column({ type: 'timestamp', name: 'expire', nullable: true })
  expire?: Date;

  @CreateDateColumn()
  created?: Date;

  @UpdateDateColumn()
  modified?: Date;
}

export { UserTokens };
