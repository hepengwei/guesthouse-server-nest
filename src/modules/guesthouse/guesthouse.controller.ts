import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import JwtGuard from '@/decorators/jwtGuard.decorator';
import SerializeAndApiRes from '@/decorators/serializeAndApiRes.decorator';
import BaseController from '../base/base.controller';
import GetHotResponseDto from './responseDto/getHotResponse.dto';
import SearchGuesthouseDto from './dto/searchGuesthouse.dto';
import SearchResponseDto from './responseDto/searchResponse.dto';
import DetailResponseDto from './responseDto/detailResponse.dto';
import GuesthouseService from './guesthouse.service';

@Controller('guesthouse')
@ApiTags('民宿模块')
export default class GuesthouseController extends BaseController {
  constructor(private guesthouseService: GuesthouseService) {
    super();
  }

  @Get('getHot')
  @ApiOperation({ summary: '获取最热名宿列表' })
  @SerializeAndApiRes(GetHotResponseDto)
  async getHot() {
    const res = await this.guesthouseService.getHot();
    return this.success(res);
  }

  @Post('search')
  @ApiOperation({ summary: '搜索名宿' })
  @SerializeAndApiRes(SearchResponseDto)
  async search(@Body() dto: SearchGuesthouseDto) {
    const res = await this.guesthouseService.search(dto);
    return this.success(res);
  }

  @Get('detail/:id')
  @ApiOperation({ summary: '获取名宿详情' })
  @SerializeAndApiRes(DetailResponseDto)
  @JwtGuard()
  async detail(@Param('id', new DefaultValuePipe(0), ParseIntPipe) id: number) {
    const res = await this.guesthouseService.detail(id);
    return this.success(res);
  }
}
