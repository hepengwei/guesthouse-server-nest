import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import TransformDate from '@/decorators/transformDate.decorator';
import ResponseDto from '@/commonDto/response.dto';
import GuesthouseResponseDto from '@/commonDto/guesthouseResponse.dto';

class GuesthouseData extends GuesthouseResponseDto {
  @ApiProperty({ description: '被浏览次数' })
  @Expose()
  showCount: number;

  @ApiProperty({ description: '开始出售时间' })
  @TransformDate()
  @Expose()
  startTime: string;

  @ApiProperty({ description: '结束出售时间' })
  @TransformDate()
  @Expose()
  endTime: string;
}

class SearchResponseData {
  @ApiProperty({ description: '民宿列表', isArray: true })
  @Expose()
  list: GuesthouseData;

  @ApiProperty({ description: '总数' })
  @Expose()
  total: number;
}

export default class SearchResponseDto extends ResponseDto {
  @ApiProperty({ description: 'data' })
  @Expose()
  data: SearchResponseData;
}
