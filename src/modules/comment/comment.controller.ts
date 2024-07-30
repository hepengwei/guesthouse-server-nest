import { Controller, Post, UseGuards, Body, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import BaseController from '../base/base.controller';
import CommentService from './comment.service';

@Controller('comment')
@UseGuards(AuthGuard('jwt'))
export default class CommentController extends BaseController {
  constructor(private commentService: CommentService) {
    super();
  }

  @Post('create')
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
