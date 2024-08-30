import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import TransformDate from '@/decorators/transformDate.decorator';
import ResponseDto from '@/commonDto/response.dto';
import GuesthouseResponseDto from '@/commonDto/guesthouseResponse.dto';

class UserDto {
  @ApiProperty({ description: '用户名' })
  @Expose()
  userName: string;

  @ApiProperty({ description: '用户头像', required: false })
  @Expose()
  avatar: string;
}

class CommentDto {
  @ApiProperty({ description: '评论内容' })
  @Expose()
  msg: string;

  @ApiProperty({ description: '创建时间' })
  @TransformDate()
  @Expose()
  createdAt: string;

  @ApiProperty({ description: '用户信息' })
  @Expose()
  userInfo: UserDto;
}

class DetailResponseData extends GuesthouseResponseDto {
  @ApiProperty({ description: '民宿描述' })
  @Expose()
  des: string;

  @ApiProperty({ description: '创建时间' })
  @TransformDate()
  @Expose()
  createdAt: string;

  @ApiProperty({ description: '开始出售时间' })
  @TransformDate()
  @Expose()
  startTime: string;

  @ApiProperty({ description: '结束出售时间' })
  @TransformDate()
  @Expose()
  endTime: string;

  @ApiProperty({ description: '评论列表', isArray: true })
  @Expose()
  comments: CommentDto;
}

export default class DetailResponseDto extends ResponseDto {
  @ApiProperty({ description: 'data' })
  @Expose()
  data: DetailResponseData;
}
