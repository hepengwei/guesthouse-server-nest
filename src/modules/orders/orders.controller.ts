import {
  Controller,
  Post,
  UseGuards,
  // UseInterceptors,
  Body,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import BaseController from '../base/base.controller';
// import CustomInterceptor from '@/interceptors/custom.interceptor';
import CommonDto from './dto/common.dto';
import GetOwnOrdersDto from './dto/getOwnOrders.dto';
import PayOrderDto from './dto/payOrder.dto';
import OrdersService from './orders.service';

@Controller('orders')
@ApiTags('订单模块')
@UseGuards(AuthGuard('jwt'))
export default class OrdersController extends BaseController {
  constructor(private ordersService: OrdersService) {
    super();
  }

  @Post('hasOrder')
  @ApiOperation({ summary: '是否被预定' })
  async hasOrder(@Body() dto: CommonDto, @Req() req: any) {
    const { guesthouseId } = dto;
    const res = await this.ordersService.hasOrder({
      guesthouseId,
      userId: req.user.userId,
    });
    return this.success(res);
  }

  @Post('create')
  @ApiOperation({ summary: '创建订单' })
  async create(@Body() dto: CommonDto, @Req() req: any) {
    const { guesthouseId } = dto;
    await this.ordersService.create({
      guesthouseId,
      userId: req.user.userId,
    });
    return this.success();
  }

  @Post('delete')
  @ApiOperation({ summary: '取消订单' })
  async delete(@Body() dto: CommonDto, @Req() req: any) {
    await this.ordersService.delete({
      ...dto,
      userId: req.user.userId,
    });
    return this.success();
  }

  @Post('list')
  @ApiOperation({ summary: '获取自己的订单列表' })
  // @UseInterceptors(CustomInterceptor)
  async list(@Body() dto: GetOwnOrdersDto, @Req() req: any) {
    const res = await this.ordersService.getOwnOrders({
      ...dto,
      userId: req.user.userId,
    });
    return this.success(res);
  }

  @Post('payOrder')
  @ApiOperation({ summary: '支付该订单' })
  async payOrder(@Body() dto: PayOrderDto, @Req() req: any) {
    const { orderId } = dto;
    await this.ordersService.payOrder({
      orderId,
      userId: req.user.userId,
    });
    return this.success();
  }
}
