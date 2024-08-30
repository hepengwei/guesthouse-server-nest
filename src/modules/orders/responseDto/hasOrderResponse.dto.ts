import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import ResponseDto from '@/commonDto/response.dto';

class HasOrderResponseData {
  @ApiProperty({ description: '是否被预定' })
  @Expose()
  hasOrder: boolean;

  @ApiProperty({ description: '是否被自己预定' })
  @Expose()
  hasOrderBySelf: boolean;

  @ApiProperty({ description: '是否已支付' })
  @Expose()
  hasPay: boolean;
}

export default class HasOrderResponseDto extends ResponseDto {
  @ApiProperty({ description: 'data' })
  @Expose()
  data: HasOrderResponseData;
}
