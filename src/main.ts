import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { GlobalFilter } from './filters/global.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new GlobalFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 去除类上不存在的字段
    }),
  );
  await app.listen(7001);
}

bootstrap();
