import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Guesthouse from './guesthouse.entity';

// 民宿图片表
@Entity()
export default class Imgs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Guesthouse, (guesthouse) => guesthouse.imgs)
  @JoinColumn()
  guesthouse: Guesthouse;
}
