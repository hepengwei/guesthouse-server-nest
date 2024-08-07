import { BadRequestException, Injectable } from '@nestjs/common';
import { MoreThanOrEqual, LessThanOrEqual, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Guesthouse from './guesthouse.entity';
import { format } from 'date-fns';

@Injectable()
export default class GuesthouseService {
  constructor(
    @InjectRepository(Guesthouse)
    private readonly guesthouseRepository: Repository<Guesthouse>,
  ) {}

  async getHot() {
    const res = await this.guesthouseRepository.find({
      select: ['id', 'name', 'des', 'price', 'showCount'],
      relations: {
        imgs: true,
      },
      order: { showCount: 'DESC' },
    });
    return res;
  }

  async search(params) {
    const where: Record<string, any> = {
      startTime: MoreThanOrEqual(params.startDate),
      endTime: LessThanOrEqual(params.endDate),
    };
    if (params.cityCode && params.cityCode !== 'all') {
      where.cityCode = params.cityCode;
    }
    if (params.name) {
      where.name = Like(`%${params.name}%`);
    }
    const res = await this.guesthouseRepository.findAndCount({
      where,
      select: ['id', 'name', 'des', 'price', 'showCount'],
      relations: {
        imgs: true,
      },
      order: { showCount: 'DESC' },
      take: params.pageSize,
      skip: params.pageSize * (params.pageNum - 1),
    });
    return {
      list: res[0],
      total: res[1],
    };
  }

  async detail(id: number) {
    if (!id) {
      throw new BadRequestException('缺少ID');
    }
    const res = await this.guesthouseRepository
      .createQueryBuilder('guesthouse')
      .leftJoinAndSelect('guesthouse.imgs', 'imgs')
      .leftJoinAndSelect('guesthouse.comments', 'comments')
      .leftJoinAndSelect('comments.userInfo', 'userInfo')
      .select([
        'guesthouse.id',
        'guesthouse.name',
        'guesthouse.des',
        'guesthouse.price',
        'guesthouse.startTime',
        'guesthouse.endTime',
        'guesthouse.createdAt',
        'imgs.url',
        'comments.msg',
        'comments.createdAt',
        'userInfo.avatar',
        'userInfo.userName',
      ])
      .where('guesthouse.id = :id', { id })
      .getOne();

    // 转换时间格式
    const dateFormat = 'yyyy-MM-dd HH:mm:ss';
    // @ts-ignore
    res.startTime = format(res.startTime, dateFormat);
    // @ts-ignore
    res.endTime = format(res.endTime, dateFormat);
    // @ts-ignore
    res.createdAt = format(res.createdAt, dateFormat);

    return res;
  }
}
