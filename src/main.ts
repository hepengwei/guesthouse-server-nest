import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { GlobalFilter } from './filters/global.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new GlobalFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 获取到的dto对象中会去除掉DTO类上不存在的字段
    }),
  );

  // 接入Swagger文档（项目运行后，访问localhost:7001/doc可查看文档）
  const swaggerOptions = new DocumentBuilder()
    .setTitle('guesthouse-server-nest API文档')
    .setDescription('guesthouse-server-nest API文档')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('doc', app, document);

  await app.listen(7001);
}

bootstrap();
