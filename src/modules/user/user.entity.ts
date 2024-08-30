import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import Comment from '../comment/comment.entity';
import { ConfigService } from '@nestjs/config';
import { myMd5 } from '@/utils/util';
import { Exclude } from 'class-transformer';

// 用户表
@Entity()
export default class User {
  constructor(readonly configService: ConfigService) {}
  @PrimaryGeneratedColumn({ comment: '用户ID' })
  userId: number;

  @Column({ comment: '用户名', length: 20 })
  userName: string;

  @Column({ comment: '密码', length: 40 })
  password: string;

  @Column({ comment: '用户头像', nullable: true })
  avatar: string;

  @Column({ comment: '手机号', length: 20, nullable: true })
  @Exclude()
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.userInfo)
  comments: Comment[];

  @BeforeInsert()
  encryptPassword() {
    // 新增用户之前将密码进行加密处理
    this.password = myMd5(this.password);
  }
}
