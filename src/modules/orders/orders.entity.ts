import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Guesthouse from '../guesthouse/guesthouse.entity';

// 订单表
@Entity()
export default class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  isPayed: number = 0; // 是否支付，0未支付, 1已支付

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Guesthouse, (guesthouse) => guesthouse.orders)
  @JoinColumn({ name: 'guesthouseId' }) // name: 'guesthouseId'为初始化时在数据库表中的字段名
  guesthouseInfo: Guesthouse; // guesthouseInfo为查询时返回JSON数据中的字段名
}