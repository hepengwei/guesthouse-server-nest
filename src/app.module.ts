import { Global, Module, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionParams } from 'ormconfig';
import LogsModule from './modules/logs/logs.module';
import RedisModule from './modules/redis/redis.module';
import CommonModule from './modules/common/common.module';
import UserModule from './modules/user/user.module';
import GuesthouseModule from './modules/guesthouse/guesthouse.module';
import CommentModule from './modules/comment/comment.module';
import OrdersModule from './modules/orders/orders.module';

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })],
    }),
    TypeOrmModule.forRoot(connectionParams),
    LogsModule,
    RedisModule,
    CommonModule,
    UserModule,
    GuesthouseModule,
    CommentModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [Logger],
  exports: [Logger],
})
export class AppModule {}
