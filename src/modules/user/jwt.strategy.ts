import {
  Injectable,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from '@/constants/enum';
import RedisService from '@/modules/redis/redis.service';
import UserService from './user.service';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected configService: ConfigService,
    private redisService: RedisService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(ConfigEnum.SECRET),
      passReqToCallback: true, // 该值为true时，validate方法的第一个参数才有req对象，否则第一参数为payload
    });
  }

  async validate(req: Request, payload: { userId: number; userName: string }) {
    const user = await this.userService._getUser(payload.userName);
    if (!user) {
      throw new HttpException('用户不存在', 500);
    }
    // 判断该Token是否在Redis中
    const token = await this.redisService.getValue(payload.userName);
    const { headers } = req;
    // @ts-ignore
    if (token !== headers?.authorization) {
      throw new UnauthorizedException();
    }
    return { userId: payload.userId, userName: payload.userName };
  }
}
