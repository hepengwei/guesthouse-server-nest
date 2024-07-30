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

// 用户表
@Entity()
export default class User {
  constructor(readonly configService: ConfigService) {}
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ length: 20 })
  userName: string;

  @Column({ length: 40 })
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ length: 20, nullable: true })
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
