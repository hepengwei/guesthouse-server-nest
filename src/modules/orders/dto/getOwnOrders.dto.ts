import { Min, IsInt, IsIn, IsNotEmpty } from 'class-validator';

export default class GetOwnOrdersDto {
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

  @IsIn([0, 1], { message: `是否支付支持为0或1` })
  @IsInt({
    message: `是否支付应该为数值类型`,
  })
  @IsNotEmpty({
    message: `是否支付为必填项`,
  })
  isPayed: number;
}
