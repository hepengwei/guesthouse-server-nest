import {
  IsOptional,
  IsString,
  MaxLength,
  IsUrl,
  IsPhoneNumber,
} from 'class-validator';

export default class UpdateUserInfoDto {
  @IsUrl(
    {},
    {
      message: '头像地址格式不正确',
    },
  )
  @MaxLength(255, {
    message: `头像地址支持的最大长度为$constraint1`,
  })
  @IsString({
    message: '头像地址应该为字符串类型',
  })
  @IsOptional()
  avatar?: string;

  @IsPhoneNumber('CN', {
    message: '手机号格式不正确',
  })
  @IsString({
    message: '手机号应该为字符串类型',
  })
  @IsOptional()
  phone?: string;
}
