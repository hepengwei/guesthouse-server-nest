import { Controller, Post, UseGuards, Body, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import BaseController from '../base/base.controller';
import CommentService from './comment.service';

@Controller('comment')
@ApiTags('评论模块')
@UseGuards(AuthGuard('jwt'))
export default class CommentController extends BaseController {
  constructor(private commentService: CommentService) {
    super();
  }

  @Post('create')
  @ApiOperation({ summary: '创建评论' })
  async create(@Body() dto: any, @Req() req: any) {
    const { guesthouseId, msg } = dto;
    await this.commentService.create({
      guesthouseId,
      msg,
      userId: req.user.userId,
    });
    return this.success();
  }
}
