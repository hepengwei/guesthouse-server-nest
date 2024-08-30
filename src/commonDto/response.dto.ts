import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export default class ResponseDto {
  @ApiProperty({ description: 'code', default: 200 })
  @Expose()
  code: number;

  @ApiProperty({ description: 'msg' })
  @Expose()
  msg: string;
}
