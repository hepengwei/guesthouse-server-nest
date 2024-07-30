import { Injectable, HttpException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from '@/constants/enum';
import UserService from './user.service';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(ConfigEnum.SECRET),
    });
  }

  async validate(payload: any) {
    const user = await this.userService._getUser(payload.userName);
    if (!user) {
      throw new HttpException('用户不存在', 500);
    }
    // TODO 判断该Token中的userId是否在Redis中
    return { userId: payload.userId, userName: payload.userName };
  }
}
