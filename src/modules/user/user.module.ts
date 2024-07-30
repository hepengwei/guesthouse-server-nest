import { Global, Module } from '@nestjs/common';
import UserController from './user.controller';
import UserService from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import JwtStrategy from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigEnum } from '@/constants/enum';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(ConfigEnum.SECRET),
        signOptions: { expiresIn: '12h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export default class UserModule {}
