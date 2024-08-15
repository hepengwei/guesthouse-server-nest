import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import BaseController from '../base/base.controller';
import SearchGuesthouseDto from './dto/searchGuesthouse.dto';
import GuesthouseService from './guesthouse.service';

@Controller('guesthouse')
@ApiTags('民宿模块')
export default class GuesthouseController extends BaseController {
  constructor(private guesthouseService: GuesthouseService) {
    super();
  }

  @Get('getHot')
  @ApiOperation({ summary: '获取最热名宿列表' })
  async getHot() {
    const res = await this.guesthouseService.getHot();
    return this.success(res);
  }

  @Post('search')
  @ApiOperation({ summary: '搜索名宿' })
  async search(@Body() dto: SearchGuesthouseDto) {
    const res = await this.guesthouseService.search(dto);
    return this.success(res);
  }

  @Get('detail/:id')
  @ApiOperation({ summary: '获取名宿详情' })
  @UseGuards(AuthGuard('jwt'))
  async detail(@Param('id', ParseIntPipe) id: number) {
    const res = await this.guesthouseService.detail(id);
    return this.success(res);
  }
}
