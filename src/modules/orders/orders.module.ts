import { Module } from '@nestjs/common';
import OrdersController from './orders.controller';
import OrdersService from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Orders from './orders.entity';
import Guesthouse from '../guesthouse/guesthouse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, Guesthouse])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export default class OrdersModule {}
