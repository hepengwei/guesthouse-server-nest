import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';
import AllowEmptyString from '@/utils/validator/AllowEmptyString';
import PaginationDto from '@/commonDto/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export default class SearchGuesthouseDto extends PaginationDto {
  @ApiProperty({ description: '开始出租时间' })
  @IsDateString(
    {},
    {
      message: '开始出租时间格式不正确',
    },
  )
  @IsString({
    message: '开始出租时间应该为字符串类型',
  })
  @IsNotEmpty({
    message: '开始出租时间为必填项',
  })
  startDate: string;

  @ApiProperty({ description: '结束出租时间' })
  @IsDateString(
    {},
    {
      message: '结束出租时间格式不正确',
    },
  )
  @IsString({
    message: '结束出租时间应该为字符串类型',
  })
  @IsNotEmpty({
    message: '结束出租时间为必填项',
  })
  endDate: string;

  @ApiProperty({ description: '城市编号', required: false })
  @IsString({
    message: '城市编号应该为字符串类型',
  })
  @AllowEmptyString()
  cityCode?: string;

  @ApiProperty({ description: '模糊搜索的值', required: false })
  @IsString({
    message: 'name应该为字符串类型',
  })
  @IsOptional()
  name?: string;
}
