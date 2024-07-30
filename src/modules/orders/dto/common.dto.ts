import { IsInt, IsNotEmpty } from 'class-validator';

export default class CommonDto {
  @IsInt({
    message: `民宿ID应该为数值类型`,
  })
  @IsNotEmpty({
    message: `民宿ID为必填项`,
  })
  guesthouseId: string;
}
