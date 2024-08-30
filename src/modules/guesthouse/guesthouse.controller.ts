import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import SerializeInterceptor from '@/interceptors/serialize.interceptor';
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
  @ApiOkResponse({ type: GetHotResponseDto })
  @UseInterceptors(new SerializeInterceptor(GetHotResponseDto))
  async getHot() {
    const res = await this.guesthouseService.getHot();
    return this.success(res);
  }

  @Post('search')
  @ApiOperation({ summary: '搜索名宿' })
  @ApiOkResponse({ type: SearchResponseDto })
  @UseInterceptors(new SerializeInterceptor(SearchResponseDto))
  async search(@Body() dto: SearchGuesthouseDto) {
    const res = await this.guesthouseService.search(dto);
    return this.success(res);
  }

  @Get('detail/:id')
  @ApiOperation({ summary: '获取名宿详情' })
  @ApiOkResponse({ type: DetailResponseDto })
  @UseInterceptors(new SerializeInterceptor(DetailResponseDto))
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async detail(@Param('id', ParseIntPipe) id: number) {
    const res = await this.guesthouseService.detail(id);
    return this.success(res);
  }
}
