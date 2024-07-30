import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Orders from './orders.entity';
import Guesthouse from '../guesthouse/guesthouse.entity';

@Injectable()
export default class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(Guesthouse)
    private readonly guesthouseRepository: Repository<Guesthouse>,
  ) {}

  async hasOrder(params) {
    const order = await this._getOrder({ guesthouseId: params.guesthouseId });
    if (!order) {
      return { hasOrder: false, hasOrderBySelf: false, hasPay: false };
    } else {
      if (order.userId === params.userId) {
        return {
          hasOrder: true,
          hasOrderBySelf: true,
          hasPay: order.isPayed,
        };
      } else {
        return {
          hasOrder: true,
          hasOrderBySelf: false,
          hasPay: order.isPayed,
        };
      }
    }
  }

  async create(params) {
    const order = await this._getOrder({ guesthouseId: params.guesthouseId });
    if (order) {
      throw new HttpException('已被预定', 500);
    } else {
      await this._transformGuesthouse(params);
      const orderTemp = await this.ordersRepository.create({
        ...params,
        isPayed: 0,
      });
      const res = await this.ordersRepository.save(orderTemp);
      return res;
    }
  }

  async delete(params) {
    const order = await this._getOrder({
      guesthouseId: params.guesthouseId,
      userId: params.userId,
    });
    if (!order) {
      throw new HttpException('订单不存在', 500);
    } else {
      await this._transformGuesthouse(params);
      await this.ordersRepository.delete(params);
    }
  }

  async getOwnOrders(params) {
    const res = await this.ordersRepository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.guesthouseInfo', 'guesthouseInfo')
      .leftJoinAndSelect('guesthouseInfo.imgs', 'imgs')
      .select([
        'orders.id',
        'orders.isPayed',
        'orders.userId',
        'orders.createdAt',
        'guesthouseInfo.id',
        'guesthouseInfo.name',
        'guesthouseInfo.price',
        'imgs.url',
      ])
      .andWhere('orders.userId = :userId', { userId: params.userId })
      .andWhere('orders.isPayed = :isPayed', { isPayed: params.isPayed })
      .orderBy('orders.createdAt', 'DESC')
      .take(params.pageSize)
      .skip(params.pageSize * (params.pageNum - 1))
      .getManyAndCount();

    return {
      list: res[0],
      total: res[1],
    };
  }

  async payOrder(params) {
    const queryParams = {
      id: params.orderId,
      userId: params.userId,
    };
    const order = await this._getOrder(queryParams);
    if (!order) {
      throw new HttpException('订单不存在', 500);
    } else if (order.isPayed === 1) {
      throw new HttpException('订单已支付', 500);
    } else {
      await this.ordersRepository.update(queryParams, {
        isPayed: 1,
      });
    }
  }

  async _transformGuesthouse(params: Record<string, any>) {
    if (params.guesthouseId) {
      params.guesthouseInfo = await this.guesthouseRepository.create({
        id: params.guesthouseId,
      });
      delete params.guesthouseId;
    }
  }

  async _getOrder(params) {
    const res = this.ordersRepository
      .createQueryBuilder('orders')
      .where(
        params.guesthouseId ? 'orders.guesthouseId= :guesthouseId' : '1=1',
        {
          guesthouseId: params.guesthouseId,
        },
      )
      .andWhere(params.userId ? 'orders.userId= :userId' : '1=1', {
        userId: params.userId,
      })
      .andWhere(params.id ? 'orders.id= :id' : '1=1', {
        id: params.id,
      })
      .getOne();
    return res;
  }
}
