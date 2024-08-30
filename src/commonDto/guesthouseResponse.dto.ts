import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ImgsResponseDto {
  @ApiProperty({ description: '图片地址' })
  @Expose()
  url: string;
}

export default class GuesthouseResponseDto {
  @ApiProperty({ description: '民宿ID' })
  @Expose()
  id: number;

  @ApiProperty({ description: '民宿名' })
  @Expose()
  name: string;

  @ApiProperty({ description: '价格' })
  @Expose()
  price: number;

  @ApiProperty({ description: '民宿图片', isArray: true })
  @Expose()
  imgs: ImgsResponseDto;
}
