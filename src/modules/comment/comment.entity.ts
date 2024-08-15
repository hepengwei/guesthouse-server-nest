import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '../user/user.entity';
import Guesthouse from '../guesthouse/guesthouse.entity';

// 评论表
@Entity()
export default class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  msg: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  userInfo: User;

  @ManyToOne(() => Guesthouse, (guesthouse) => guesthouse.comments)
  @JoinColumn()
  guesthouse: Guesthouse;
}