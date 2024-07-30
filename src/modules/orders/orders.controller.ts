import { Controller, Post, UseGuards, Body, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import BaseController from '../base/base.controller';
import CommonDto from './dto/common.dto';
import GetOwnOrdersDto from './dto/getOwnOrders.dto';
import PayOrderDto from './dto/payOrder.dto';
import OrdersService from './orders.service';

@Controller('orders')
@UseGuards(AuthGuard('jwt'))
export default class OrdersController extends BaseController {
  constructor(private ordersService: OrdersService) {
    super();
  }

  @Post('hasOrder')
  async hasOrder(@Body() dto: CommonDto, @Req() req: any) {
    const { guesthouseId } = dto;
    const res = await this.ordersService.hasOrder({
      guesthouseId,
      userId: req.user.userId,
    });
    return this.success(res);
  }

  @Post('create')
  async create(@Body() dto: CommonDto, @Req() req: any) {
    const { guesthouseId } = dto;
    await this.ordersService.create({
      guesthouseId,
      userId: req.user.userId,
    });
    return this.success();
  }

  @Post('delete')
  async delete(@Body() dto: CommonDto, @Req() req: any) {
    await this.ordersService.delete({
      ...dto,
      userId: req.user.userId,
    });
    return this.success();
  }

  @Post('list')
  async list(@Body() dto: GetOwnOrdersDto, @Req() req: any) {
    const res = await this.ordersService.getOwnOrders({
      ...dto,
      userId: req.user.userId,
    });
    return this.success(res);
  }

  @Post('payOrder')
  async payOrder(@Body() dto: PayOrderDto, @Req() req: any) {
    const { orderId } = dto;
    await this.ordersService.payOrder({
      orderId,
      userId: req.user.userId,
    });
    return this.success();
  }
}
