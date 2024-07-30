import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import Imgs from './imgs.entity';
import Comment from '../comment/comment.entity';
import Orders from '../orders/orders.entity';

// 民宿表
@Entity()
export default class Guesthouse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 150, nullable: true })
  des: string;

  @Column({ length: 100 })
  address: string;

  @Column()
  price: number;

  @Column({ length: 10 })
  cityCode: string;

  @Column()
  showCount: number = 0;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Imgs, (imgs) => imgs.guesthouse)
  imgs: Imgs[];

  @OneToMany(() => Comment, (comment) => comment.guesthouse)
  comments: Comment[];

  @OneToOne(() => Orders, (orders) => orders.guesthouseInfo)
  orders: Orders;
}
