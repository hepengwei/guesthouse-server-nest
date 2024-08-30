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
  @PrimaryGeneratedColumn({ comment: '民宿ID' })
  id: number;

  @Column({ comment: '民宿名', length: 50 })
  name: string;

  @Column({ comment: '民宿描述', length: 150, nullable: true })
  des: string;

  @Column({ comment: '地址', length: 100 })
  address: string;

  @Column({ comment: '价格' })
  price: number;

  @Column({ comment: '所在城市Code', length: 10 })
  cityCode: string;

  @Column({ comment: '被浏览次数' })
  showCount: number = 0;

  @Column({ comment: '开始出租时间' })
  startTime: Date;

  @Column({ comment: '结束出租时间' })
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
