import { Module } from '@nestjs/common';
import CommentController from './comment.controller';
import CommentService from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Comment from './comment.entity';
import User from '../user/user.entity';
import Guesthouse from '../guesthouse/guesthouse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Guesthouse])],
  controllers: [CommentController],
  providers: [CommentService],
})
export default class CommentModule {}
