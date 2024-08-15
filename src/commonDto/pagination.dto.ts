import { IsInt, Min, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class PaginationDto {
  @ApiProperty({ description: '第几页', default: 1 })
  @Min(1, {
    message: `pageNum支持的最小值为$constraint1`,
  })
  @IsInt({
    message: 'pageNum应该为数值类型',
  })
  @IsNotEmpty({
    message: 'pageNum为必填项',
  })
  pageNum: number;

  @ApiProperty({ description: '每页多少条数据', default: 10 })
  @Min(1, {
    message: `pageSize支持的最小值为$constraint1`,
  })
  @IsInt({
    message: 'pageSize应该为数值类型',
  })
  @IsNotEmpty({
    message: 'pageSize为必填项',
  })
  pageSize: number;
}
