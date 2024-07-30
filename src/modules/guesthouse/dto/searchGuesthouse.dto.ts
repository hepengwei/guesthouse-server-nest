import {
  IsOptional,
  IsInt,
  IsString,
  IsNotEmpty,
  Min,
  IsDateString,
} from 'class-validator';

export default class SearchGuesthouseDto {
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

  @IsString({
    message: '城市编号应该为字符串类型',
  })
  @IsOptional()
  cityCode?: string;

  @IsString({
    message: 'name应该为字符串类型',
  })
  @IsOptional()
  name?: string;
}
