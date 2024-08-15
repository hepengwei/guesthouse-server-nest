import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class PayOrderDto {
  @ApiProperty({ description: '订单编号' })
  @IsInt({
    message: `订单编号应该为数值类型`,
  })
  @IsNotEmpty({
    message: '订单编号为必填项',
  })
  orderId: number;
}
