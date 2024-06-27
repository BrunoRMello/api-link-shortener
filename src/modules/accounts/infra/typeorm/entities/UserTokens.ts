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

  @Column()
  user_id?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  users: User;

  @Column()
  token?: string;

  @Column()
  expire?: Date;

  @CreateDateColumn()
  created?: Date;

  @UpdateDateColumn()
  modified?: Date;
}

export { UserTokens };
