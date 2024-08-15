import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { myMd5 } from '@/utils/util';
import RedisService from '../redis/redis.service';
import User from './user.entity';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async regist(userName: string, password: string) {
    const user = await this._getUser(userName);
    if (user) {
      throw new HttpException('用户已存在', 500);
    }
    // 只有使用create+save的方法新增用户，可以触发监听的BeforeInsert事件，而使用insert方法则不会触发
    const userTemp = await this.userRepository.create({
      userName,
      password,
    });
    await this.userRepository.save(userTemp);
  }

  async login(userName: string, password: string) {
    const user = await this._getUser(userName, password);
    if (!user) {
      throw new HttpException('用户名或密码不正确', 500);
    }
    const payload = { userId: user.userId, userName: user.userName };
    const token = this.jwtService.sign(payload);
    // 还要将Token保存到Redis中
    if (this.redisService.getValue(user.userName)) {
      this.redisService.deleteValue(user.userName);
    }
    this.redisService.setValue(user.userName, token, 6 * 60 * 60);
    return { ...user, token: `Bearer ${token}` };
  }

  async logout(userName: string) {
    // 将Redis中保存的Token删除
    this.redisService.deleteValue(userName);
  }

  async updateUserInfo(params) {
    await this.userRepository.update(
      { userId: params.userId },
      {
        avatar: params.avatar,
        phone: params.phone,
      },
    );
  }

  async _getUser(userName: string, password?: string) {
    const where = password
      ? { userName, password: myMd5(password) }
      : { userName };
    const res = await this.userRepository.findOne({
      where,
      select: ['userId', 'userName', 'avatar', 'phone'],
    });
    return res;
  }

  async _createUser(params) {
    const user = await this.userRepository.create(params);
    return this.userRepository.save(user);
  }
}
