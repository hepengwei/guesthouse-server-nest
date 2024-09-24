import { Controller, Post, Body, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import JwtGuard from '@/decorators/jwtGuard.decorator';
import BaseController from '../base/base.controller';
import CreateCommentDto from './dto/createComment.dto';
import ResponseDto from '@/commonDto/response.dto';
import CommentService from './comment.service';

@Controller('comment')
@ApiTags('评论模块')
@JwtGuard()
export default class CommentController extends BaseController {
  constructor(private commentService: CommentService) {
    super();
  }

  @Post('create')
  @ApiOperation({ summary: '创建评论' })
  @ApiOkResponse({ type: ResponseDto })
  async create(@Body() dto: CreateCommentDto, @Req() req: any) {
    const { guesthouseId, msg } = dto;
    await this.commentService.create({
      guesthouseId,
      msg,
      userId: req.user.userId,
    });
    return this.success();
  }
}
