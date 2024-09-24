/**
 * 将AuthGuard和ApiBearerAuth组合在一起的装饰器
 */
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

const JwtGuard = () => {
  return applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard('jwt')));
};

export default JwtGuard;
