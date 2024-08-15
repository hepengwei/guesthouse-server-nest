import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class LoginDto {
  @ApiProperty({ description: '用户名' })
  @IsString({
    message: `用户名应该为字符串类型`,
  })
  @IsNotEmpty({
    message: `用户名为必填项`,
  })
  userName: string;

  @ApiProperty({ description: '密码' })
  @IsString({
    message: `密码应该为字符串类型`,
  })
  @IsNotEmpty({
    message: `密码为必填项`,
  })
  password: string;
}
