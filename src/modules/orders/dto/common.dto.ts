import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CommonDto {
  @ApiProperty({ description: '民宿ID' })
  @IsInt({
    message: `民宿ID应该为数值类型`,
  })
  @IsNotEmpty({
    message: `民宿ID为必填项`,
  })
  guesthouseId: number;
}
