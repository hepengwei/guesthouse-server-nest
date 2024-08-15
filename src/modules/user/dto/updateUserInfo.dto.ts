import { IsString, MaxLength, IsPhoneNumber } from 'class-validator';
import AllowEmptyString from '@/utils/validator/AllowEmptyString';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateUserInfoDto {
  @ApiProperty({ description: '用户头像', required: false })
  @MaxLength(255, {
    message: `头像地址支持的最大长度为$constraint1`,
  })
  @IsString({
    message: '头像地址应该为字符串类型',
  })
  @AllowEmptyString()
  avatar?: string;

  @ApiProperty({ description: '手机号', required: false })
  @IsPhoneNumber('CN', {
    message: '手机号格式不正确',
  })
  @IsString({
    message: '手机号应该为字符串类型',
  })
  @AllowEmptyString()
  phone?: string;
}
