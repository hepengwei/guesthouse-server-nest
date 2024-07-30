import { IsInt, IsNotEmpty } from 'class-validator';

export default class PayOrderDto {
  @IsInt({
    message: `订单编号应该为数值类型`,
  })
  @IsNotEmpty({
    message: '订单编号为必填项',
  })
  orderId: number;
}
