import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import BaseController from '../base/base.controller';
import SearchGuesthouseDto from './dto/searchGuesthouse.dto';
import GuesthouseService from './guesthouse.service';

@Controller('guesthouse')
export default class GuesthouseController extends BaseController {
  constructor(private guesthouseService: GuesthouseService) {
    super();
  }

  @Get('getHot')
  async getHot() {
    const res = await this.guesthouseService.getHot();
    return this.success(res);
  }

  @Post('search')
  async search(@Body() dto: SearchGuesthouseDto) {
    const res = await this.guesthouseService.search(dto);
    return this.success(res);
  }

  @Get('detail/:id')
  @UseGuards(AuthGuard('jwt'))
  async detail(@Param('id') id: string) {
    const res = await this.guesthouseService.detail(id);
    return this.success(res);
  }
}
