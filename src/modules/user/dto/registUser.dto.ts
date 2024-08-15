import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class RegistUserDto {
  @ApiProperty({ description: '用户名' })
  @Length(2, 20, {
    message: `用户名的长度应该在$constraint1~$constraint2之间`,
  })
  @IsString({
    message: `用户名应该为字符串类型`,
  })
  @IsNotEmpty({
    message: `用户名为必填项`,
  })
  userName: string;

  @ApiProperty({ description: '密码' })
  @Length(6, 30, {
    message: `密码的长度应该在$constraint1~$constraint2之间`,
  })
  @IsString({
    message: `密码应该为字符串类型`,
  })
  @IsNotEmpty({
    message: `密码为必填项`,
  })
  password: string;
}
