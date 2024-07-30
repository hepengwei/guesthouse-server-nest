import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Comment from './comment.entity';
import User from '../user/user.entity';
import Guesthouse from '../guesthouse/guesthouse.entity';

@Injectable()
export default class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Guesthouse)
    private readonly guesthouseRepository: Repository<Guesthouse>,
  ) {}

  async create(params) {
    params.userInfo = await this.userRepository.create({
      userId: params.userId,
    });
    delete params.userId;
    params.guesthouse = await this.guesthouseRepository.create({
      id: params.guesthouseId,
    });
    delete params.guesthouseId;
    const commentTemp = await this.commentRepository.create(params);
    const res = await this.commentRepository.save(commentTemp);
    return res;
  }
}
