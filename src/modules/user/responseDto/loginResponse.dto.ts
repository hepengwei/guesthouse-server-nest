import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import ResponseDto from '@/commonDto/response.dto';

class LoginResponseData {
  @ApiProperty({ description: '用户ID' })
  @Expose()
  userId: number;

  @ApiProperty({ description: '用户名' })
  @Expose()
  userName: string;

  @ApiProperty({ description: 'Token' })
  @Expose()
  token: string;

  @ApiProperty({ description: '用户头像', required: false })
  @Expose()
  avatar: string;

  @ApiProperty({ description: '手机号', required: false })
  @Expose()
  phone: string;
}

export default class LoginResponseDto extends ResponseDto {
  @ApiProperty({ description: 'data' })
  @Expose()
  data: LoginResponseData;
}
