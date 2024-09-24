/**
 * 将SerializeInterceptor和ApiOkResponse组合在一起的装饰器
 */
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import SerializeInterceptor from '@/interceptors/serialize.interceptor';

const SerializeAndApiRes = (dto: any) => {
  return applyDecorators(
    ApiOkResponse({ type: dto }),
    UseInterceptors(new SerializeInterceptor(dto)),
  );
};

export default SerializeAndApiRes;
