import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import TransformDate from '@/decorators/transformDate.decorator';
import ResponseDto from '@/commonDto/response.dto';
import GuesthouseResponseDto from '@/commonDto/guesthouseResponse.dto';

class OrderData {
  @ApiProperty({ description: '订单ID' })
  @Expose()
  id: number;

  @ApiProperty({ description: '是否已支付' })
  @Expose()
  isPayed: boolean;

  @ApiProperty({ description: '用户ID' })
  @Expose()
  userId: number;

  @ApiProperty({ description: '创建时间' })
  @TransformDate()
  @Expose()
  createdAt: string;

  @ApiProperty({ description: '民宿信息' })
  @Expose()
  guesthouseInfo: GuesthouseResponseDto;
}

class GetOwnOrdersResponseData {
  @ApiProperty({ description: '订单列表', isArray: true })
  @Expose()
  list: OrderData;

  @ApiProperty({ description: '总数' })
  @Expose()
  total: number;
}

export default class GetOwnOrdersResponseDto extends ResponseDto {
  @ApiProperty({ description: 'data' })
  @Expose()
  data: GetOwnOrdersResponseData;
}
