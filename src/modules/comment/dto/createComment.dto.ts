import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export default class CreateCommentDto {
  @IsString({
    message: `民宿ID应该为字符串类型`,
  })
  @IsNotEmpty({
    message: `民宿ID为必填项`,
  })
  guesthouseId: string;

  @MaxLength(255, {
    message: `评论内容支持的最大长度为$constraint1`,
  })
  @IsString({
    message: `评论内容应该为字符串类型`,
  })
  @IsNotEmpty({
    message: `评论内容为必填项`,
  })
  msg: string;
}
