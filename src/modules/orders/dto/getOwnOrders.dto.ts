import { IsInt, IsIn, IsNotEmpty } from 'class-validator';
import PaginationDto from '@/commonDto/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export default class GetOwnOrdersDto extends PaginationDto {
  @ApiProperty()
  @IsIn([0, 1], { message: `是否支付支持为0或1` })
  @IsInt({
    message: `是否支付应该为数值类型`,
  })
  @IsNotEmpty({
    message: `是否支付为必填项`,
  })
  isPayed: number;
}
