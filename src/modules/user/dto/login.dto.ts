import { IsString, IsNotEmpty } from 'class-validator';

export default class LoginDto {
  @IsString({
    message: `用户名应该为字符串类型`,
  })
  @IsNotEmpty({
    message: `用户名为必填项`,
  })
  userName: string;

  @IsString({
    message: `密码应该为字符串类型`,
  })
  @IsNotEmpty({
    message: `密码为必填项`,
  })
  password: string;
}
