import { Module } from '@nestjs/common';
import GuesthouseController from './guesthouse.controller';
import GuesthouseService from './guesthouse.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Guesthouse from './guesthouse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guesthouse])],
  controllers: [GuesthouseController],
  providers: [GuesthouseService],
})
export default class GuesthouseModule {}
