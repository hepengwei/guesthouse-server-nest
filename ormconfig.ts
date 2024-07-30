import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { ConfigEnum } from './src/constants/enum';
import User from './src/modules/user/user.entity';
import Guesthouse from './src/modules/guesthouse/guesthouse.entity';
import Imgs from './src/modules/guesthouse/imgs.entity';
import Comment from './src/modules/comment/comment.entity';
import Orders from './src/modules/orders/orders.entity';

// 读取.env文件数据
const getEnv = (env: string): Record<string, unknown> => {
  if (fs.existsSync(env)) {
    return dotenv.parse(fs.readFileSync(env));
  }
  return {};
};

// 通过环境变量生成不同的TypeORM的配置
const buildConnectionParams = () => {
  const defaultConfig = getEnv('.env');
  const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;
  const envConfig = getEnv(envFilePath);
  const config = { ...defaultConfig, ...envConfig };
  return {
    type: config[ConfigEnum.DB_TYPE],
    host: config[ConfigEnum.DB_HOST],
    port: config[ConfigEnum.DB_PORT],
    username: config[ConfigEnum.DB_USERNAME],
    password: config[ConfigEnum.DB_PASSWORD],
    database: config[ConfigEnum.DB_DATABASE],
    entities: [User, Guesthouse, Imgs, Comment, Orders],
    synchronize: true,
    logging: ['error'],
    schematics: {
      databaseSchema: {
        options: {
          charset: 'UTF8MB4',
        },
      },
    },
  } as TypeOrmModuleAsyncOptions;
};

export const connectionParams = buildConnectionParams();

export default new DataSource({
  ...connectionParams,
  migrations: ['src/migrations/**'],
  subscribers: [],
} as DataSourceOptions);
