import {
  Expose,
  // Transform,
  // TransformFnParams
} from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import ResponseDto from '@/commonDto/response.dto';
import GuesthouseResponseDto from '@/commonDto/guesthouseResponse.dto';

class GetHotResponseData extends GuesthouseResponseDto {
  @ApiProperty({ description: '民宿描述' })
  @Expose()
  des: string;

  @ApiProperty({ description: '被浏览次数' })
  @Expose()
  showCount: number;

  // 如果想要将数组转为字符串，可如下写自定义转换函数
  // @ApiProperty({ description: '民宿图片', isArray: true })
  // @Transform((params: TransformFnParams) => {
  //   // const value = params.obj[params.key]; // 这里由于将imgs修改为了img，所以就不能直接用params.key，因为params.key此时为img
  //   const value = params.obj['imgs'];
  //   if (value?.length > 0) {
  //     return value[0].url;
  //   }
  //   return '';
  // })
  // @Expose()
  // img: string;
}

export default class GetHotResponseDto extends ResponseDto {
  @ApiProperty({ description: 'data' })
  @Expose()
  data: GetHotResponseData;
}
